import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/students";

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add student");
        return;
      }

      alert("Student added successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        date_of_birth: "",
      });

      setShowForm(false);
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <div>
          <h1>👨‍🎓 Students</h1>
          <p>Manage students enrolled in the institute</p>
        </div>

        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Close" : "+ Add Student"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Add New Student</h2>

          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Save Student
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
            <h2>Student List</h2>
            <p>{students.length} student(s) found</p>
          </div>

          <button className="refresh-btn" onClick={fetchStudents}>
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state">Loading students...</div>
        ) : students.length === 0 ? (
          <div className="empty-state">
            <div>👨‍🎓</div>
            <h3>No students found</h3>
            <p>Add your first student using the button above.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>#{student.id}</td>
                    <td>
                      <strong>{student.name}</strong>
                    </td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.address || "-"}</td>
                    <td>
                      {student.date_of_birth
                        ? new Date(student.date_of_birth).toLocaleDateString(
                            "en-IN",
                          )
                        : "-"}
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

export default StudentManagement;
