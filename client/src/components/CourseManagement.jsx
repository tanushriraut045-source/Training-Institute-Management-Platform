import { useEffect, useState } from "react";

const COURSE_API = "http://localhost:5000/api/courses";
const TRAINER_API = "http://localhost:5000/api/trainers";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    course_name: "",
    description: "",
    duration: "",
    fees: "",
    trainer_id: "",
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await fetch(COURSE_API);
      const data = await response.json();

      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch(TRAINER_API);
      const data = await response.json();

      setTrainers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTrainers();
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
      const response = await fetch(COURSE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          fees: Number(formData.fees),
          trainer_id: Number(formData.trainer_id),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add course");
        return;
      }

      alert("Course added successfully!");

      setFormData({
        course_name: "",
        description: "",
        duration: "",
        fees: "",
        trainer_id: "",
      });

      setShowForm(false);
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <div>
          <h1>📚 Courses</h1>
          <p>Manage training courses and assigned trainers</p>
        </div>

        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Close" : "+ Add Course"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Add New Course</h2>

          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label>Course Name</label>

              <input
                type="text"
                name="course_name"
                value={formData.course_name}
                onChange={handleChange}
                placeholder="Enter course name"
                required
              />
            </div>

            <div className="form-group">
              <label>Duration</label>

              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 6 Months"
                required
              />
            </div>

            <div className="form-group">
              <label>Course Fees</label>

              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="Enter course fees"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Trainer</label>

              <select
                name="trainer_id"
                value={formData.trainer_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Trainer</option>

                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter course description"
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Save Course
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
            <h2>Course List</h2>

            <p>{courses.length} course(s) found</p>
          </div>

          <button
            className="refresh-btn"
            onClick={() => {
              fetchCourses();
              fetchTrainers();
            }}
          >
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="empty-state">
            <div>📚</div>

            <h3>No courses found</h3>

            <p>Add your first course using the button above.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Course Name</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Fees</th>
                  <th>Trainer</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>#{course.id}</td>

                    <td>
                      <strong>{course.course_name}</strong>
                    </td>

                    <td>{course.description || "-"}</td>

                    <td>{course.duration}</td>

                    <td>₹{Number(course.fees).toLocaleString("en-IN")}</td>

                    <td>{course.trainer_name || "-"}</td>
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

export default CourseManagement;
