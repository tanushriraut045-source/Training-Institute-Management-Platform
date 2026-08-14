import { useState } from "react";

const API_URL = "http://localhost:5000/api";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      // Notify App about successful login
      onLogin(data.user);
    } catch (error) {
      console.error("Login error:", error);

      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}

        <div className="login-logo">🎓</div>

        {/* Application Name */}

        <h1>TrainingHub</h1>

        <p className="login-subtitle">Training Institute Management System</p>

        <div className="login-divider"></div>

        {/* Welcome */}

        <h2>Welcome Back</h2>

        <p className="login-description">Sign in to access your dashboard</p>

        {/* Error Message */}

        {error && <div className="login-error">⚠️ {error}</div>}

        {/* Login Form */}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}

          <div className="login-form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}

          <div className="login-form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          {/* Sign In Button */}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}

        <p className="login-footer">© 2026 TrainingHub. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;
