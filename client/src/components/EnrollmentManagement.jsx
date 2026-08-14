import { useEffect, useState } from "react";

const ENROLLMENT_API = "http://localhost:5000/api/enrollments";
const STUDENT_API = "http://localhost:5000/api/students";
const COURSE_API = "http://localhost:5000/api/courses";

function EnrollmentManagement() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
    enrollment_date: "",
    status: "active",
  });

  const fetchEnrollments = async () => {
    try {
      setLoading(true);

      const response = await fetch(ENROLLMENT_API);
      const data = await response.json();

      setEnrollments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(STUDENT_API);
      const data = await response.json();

      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(COURSE_API);
      const data = await response.json();

      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchEnrollments();
    fetchStudents();
    fetchCourses();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(ENROLLMENT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: Number(formData.student_id),
          course_id: Number(formData.course_id),
          enrollment_date: formData.enrollment_date,
          status: formData.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create enrollment");
        return;
      }

      alert("Enrollment created successfully!");

      setFormData({
        student_id: "",
        course_id: "",
        enrollment_date: "",
        status: "active",
      });

      setShowForm(false);

      fetchEnrollments();
    } catch (error) {
      console.error("Error creating enrollment:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <div>
          <h1>📝 Enrollments</h1>

          <p>Manage student course enrollments</p>
        </div>

        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Close" : "+ Add Enrollment"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Create New Enrollment</h2>

          <form onSubmit={handleSubmit} className="student-form">
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

            <div className="form-group">
              <label>Enrollment Date</label>

              <input
                type="date"
                name="enrollment_date"
                value={formData.enrollment_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>

                <option value="completed">Completed</option>

                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Save Enrollment
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

      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Enrollment List</h2>

            <p>{enrollments.length} enrollment(s) found</p>
          </div>

          <button
            className="refresh-btn"
            onClick={() => {
              fetchEnrollments();
              fetchStudents();
              fetchCourses();
            }}
          >
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state">Loading enrollments...</div>
        ) : enrollments.length === 0 ? (
          <div className="empty-state">
            <div>📝</div>

            <h3>No enrollments found</h3>

            <p>Create your first enrollment using the button above.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Enrollment Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td>#{enrollment.id}</td>

                    <td>
                      <strong>{enrollment.student_name || "-"}</strong>
                    </td>

                    <td>{enrollment.course_name || "-"}</td>

                    <td>
                      {enrollment.enrollment_date
                        ? new Date(
                            enrollment.enrollment_date,
                          ).toLocaleDateString("en-IN")
                        : "-"}
                    </td>

                    <td>
                      <span
                        className={`status-badge status-${enrollment.status}`}
                      >
                        {enrollment.status}
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

export default EnrollmentManagement;
