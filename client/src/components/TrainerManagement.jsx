import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/trainers";

function TrainerManagement() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
  });

  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      setTrainers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add trainer");
        return;
      }

      alert("Trainer added successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        specialization: "",
      });

      setShowForm(false);
      fetchTrainers();
    } catch (error) {
      console.error("Error adding trainer:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="module-page">
      <div className="page-header">
        <div>
          <h1>👨‍🏫 Trainers</h1>
          <p>Manage trainers and their specializations</p>
        </div>

        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Close" : "+ Add Trainer"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Add New Trainer</h2>

          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label>Trainer Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter trainer name"
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
              <label>Specialization</label>

              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. Java & Web Development"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Save Trainer
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
            <h2>Trainer List</h2>

            <p>{trainers.length} trainer(s) found</p>
          </div>

          <button className="refresh-btn" onClick={fetchTrainers}>
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state">Loading trainers...</div>
        ) : trainers.length === 0 ? (
          <div className="empty-state">
            <div>👨‍🏫</div>

            <h3>No trainers found</h3>

            <p>Add your first trainer using the button above.</p>
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
                  <th>Specialization</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {trainers.map((trainer) => (
                  <tr key={trainer.id}>
                    <td>#{trainer.id}</td>

                    <td>
                      <strong>{trainer.name}</strong>
                    </td>

                    <td>{trainer.email}</td>

                    <td>{trainer.phone}</td>

                    <td>{trainer.specialization}</td>

                    <td>
                      {trainer.created_at
                        ? new Date(trainer.created_at).toLocaleDateString(
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

export default TrainerManagement;
