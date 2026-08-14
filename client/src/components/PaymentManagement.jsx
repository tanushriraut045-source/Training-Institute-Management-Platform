import { useEffect, useState } from "react";

const PAYMENT_API = "http://localhost:5000/api/payments";
const STUDENT_API = "http://localhost:5000/api/students";
const COURSE_API = "http://localhost:5000/api/courses";

function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
    amount: "",
    payment_date: "",
    payment_method: "upi",
    status: "paid",
    transaction_id: "",
  });

  // =========================
  // FETCH PAYMENTS
  // =========================

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response = await fetch(PAYMENT_API);
      const data = await response.json();

      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH STUDENTS
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
  // LOAD DATA
  // =========================

  useEffect(() => {
    fetchPayments();
    fetchStudents();
    fetchCourses();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT PAYMENT
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(PAYMENT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: Number(formData.student_id),
          course_id: Number(formData.course_id),
          amount: Number(formData.amount),
          payment_date: formData.payment_date,
          payment_method: formData.payment_method,
          status: formData.status,
          transaction_id: formData.transaction_id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create payment");
        return;
      }

      alert("Payment created successfully!");

      setFormData({
        student_id: "",
        course_id: "",
        amount: "",
        payment_date: "",
        payment_method: "upi",
        status: "paid",
        transaction_id: "",
      });

      setShowForm(false);

      fetchPayments();
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="module-page">
      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">
        <div>
          <h1>💰 Payments</h1>

          <p>Manage student course payments</p>
        </div>

        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Close" : "+ Add Payment"}
        </button>
      </div>

      {/* =========================
          PAYMENT FORM
      ========================= */}

      {showForm && (
        <div className="form-card">
          <h2>Create New Payment</h2>

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

            {/* Amount */}

            <div className="form-group">
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            {/* Payment Date */}

            <div className="form-group">
              <label>Payment Date</label>

              <input
                type="date"
                name="payment_date"
                value={formData.payment_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Payment Method */}

            <div className="form-group">
              <label>Payment Method</label>

              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
              >
                <option value="upi">UPI</option>

                <option value="cash">Cash</option>

                <option value="card">Card</option>

                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Status */}

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="paid">Paid</option>

                <option value="pending">Pending</option>

                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Transaction ID */}

            <div className="form-group full-width">
              <label>Transaction ID</label>

              <input
                type="text"
                name="transaction_id"
                placeholder="Example: TXN10002"
                value={formData.transaction_id}
                onChange={handleChange}
                required
              />
            </div>

            {/* Buttons */}

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Save Payment
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
          PAYMENT TABLE
      ========================= */}

      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Payment List</h2>

            <p>{payments.length} payment(s) found</p>
          </div>

          <button
            className="refresh-btn"
            onClick={() => {
              fetchPayments();
              fetchStudents();
              fetchCourses();
            }}
          >
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="empty-state">Loading payments...</div>
        ) : payments.length === 0 ? (
          <div className="empty-state">
            <div>💰</div>

            <h3>No payments found</h3>

            <p>Create your first payment using the button above.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>#{payment.id}</td>

                    <td>
                      <strong>{payment.student_name || "-"}</strong>
                    </td>

                    <td>{payment.course_name || "-"}</td>

                    <td>
                      ₹{Number(payment.amount || 0).toLocaleString("en-IN")}
                    </td>

                    <td>
                      {payment.payment_date
                        ? new Date(payment.payment_date).toLocaleDateString(
                            "en-IN",
                          )
                        : "-"}
                    </td>

                    <td>{payment.payment_method || "-"}</td>

                    <td>
                      <span className={`status-badge status-${payment.status}`}>
                        {payment.status}
                      </span>
                    </td>

                    <td>{payment.transaction_id || "-"}</td>
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

export default PaymentManagement;
