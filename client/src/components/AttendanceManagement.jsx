import { useEffect, useState } from "react";

const ATTENDANCE_API = "http://localhost:5000/api/attendance";
const STUDENT_API = "http://localhost:5000/api/students";
const COURSE_API = "http://localhost:5000/api/courses";

function AttendanceManagement() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
    attendance_date: "",
    status: "present",
  });

  // =========================
  // FETCH ATTENDANCE
  // Attendance records database
  // मधून आणण्यासाठी
  // =========================

  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const response = await fetch(ATTENDANCE_API);
      const data = await response.json();

      setAttendance(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH STUDENTS
  // Student dropdown साठी
  // =========================

  const fetchStudents = async () => {
    try {
      const response = await fetch(STUDENT_API);
      const data = await response.json();

      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // =========================
  // FETCH COURSES
  // Course dropdown साठी
  // =========================

  const fetchCourses = async () => {
    try {
      const response = await fetch(COURSE_API);
      const data = await response.json();

      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // =========================
  // LOAD ALL DATA
  // Component open झाल्यावर
  // attendance, students आणि courses
  // load करण्यासाठी
  // =========================

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
    fetchCourses();
  }, []);

  // =========================
  // HANDLE INPUT
  // Form मधील values update
  // करण्यासाठी
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT ATTENDANCE
  // नवीन attendance database मध्ये
  // save करण्यासाठी
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(ATTENDANCE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: Number(formData.student_id),

          course_id: Number(formData.course_id),

          attendance_date: formData.attendance_date,

          status: formData.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create attendance");
        return;
      }

      alert("Attendance created successfully!");

      // Form reset
      setFormData({
        student_id: "",
        course_id: "",
        attendance_date: "",
        status: "present",
      });

      // Form close
      setShowForm(false);

      // List refresh
      fetchAttendance();
    } catch (error) {
      console.error("Error creating attendance:", error);

      alert("Unable to connect to server");
    }
  };

  return (
    <div className="module-page">
      {/* =========================
          PAGE HEADER
          Attendance page चा heading
      ========================= */}

      <div className="page-header">
        <div>
          <h1>📅 Attendance</h1>

          <p>Manage student attendance records</p>
        </div>

        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Close" : "+ Add Attendance"}
        </button>
      </div>

      {/* =========================
          ATTENDANCE FORM
          नवीन attendance add करण्यासाठी
      ========================= */}

      {showForm && (
        <div className="form-card">
          <h2>Mark Student Attendance</h2>

          <form onSubmit={handleSubmit} className="student-form">
            {/* Student */}

            <div className="form-group">
              <label>Student</label>

              <select
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Student</option>

                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Course */}

            <div className="form-group">
              <label>Course</label>

              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>

                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Attendance Date */}

            <div className="form-group">
              <label>Attendance Date</label>

              <input
                type="date"
                name="attendance_date"
                value={formData.attendance_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Attendance Status */}

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="present">Present</option>

                <option value="absent">Absent</option>

                <option value="late">Late</option>
              </select>
            </div>

            {/* Buttons */}

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Save Attendance
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================
          ATTENDANCE TABLE
          Saved attendance records
          दाखवण्यासाठी
      ========================= */}

      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Attendance List</h2>

            <p>{attendance.length} attendance record(s) found</p>
          </div>

          <button
            className="refresh-btn"
            onClick={() => {
              fetchAttendance();
              fetchStudents();
              fetchCourses();
            }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="empty-state">Loading attendance...</div>
        ) : attendance.length === 0 ? (
          /* Empty State */

          <div className="empty-state">
            <div>📅</div>

            <h3>No attendance records found</h3>

            <p>Add attendance using the button above.</p>
          </div>
        ) : (
          /* Attendance Table */

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Attendance Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id}>
                    <td>#{record.id}</td>

                    <td>
                      <strong>{record.student_name || "-"}</strong>
                    </td>

                    <td>{record.course_name || "-"}</td>

                    <td>
                      {record.attendance_date
                        ? new Date(record.attendance_date).toLocaleDateString(
                            "en-IN",
                          )
                        : "-"}
                    </td>

                    <td>
                      <span className={`status-badge status-${record.status}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceManagement;
