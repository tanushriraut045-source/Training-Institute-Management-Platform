import { useEffect, useState } from "react";

import Login from "./components/Login";
import StudentManagement from "./components/StudentManagement";
import TrainerManagement from "./components/TrainerManagement";
import CourseManagement from "./components/CourseManagement";
import EnrollmentManagement from "./components/EnrollmentManagement";
import PaymentManagement from "./components/PaymentManagement";
import AttendanceManagement from "./components/AttendanceManagement";

import "./App.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");

  const [stats, setStats] = useState({
    students: 0,
    trainers: 0,
    courses: 0,
    enrollments: 0,
    payments: 0,
    attendance: 0,
  });

  const [loading, setLoading] = useState(true);

  // =========================
  // CHECK EXISTING LOGIN
  // Browser मध्ये token/user आधीपासून
  // save आहे का ते check करण्यासाठी
  // =========================

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid saved user:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // =========================
  // FETCH DASHBOARD DATA
  // =========================

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const endpoints = [
        "students",
        "trainers",
        "courses",
        "enrollments",
        "payments",
        "attendance",
      ];

      const responses = await Promise.all(
        endpoints.map((endpoint) => fetch(`${API_URL}/${endpoint}`)),
      );

      const data = await Promise.all(
        responses.map((response) => response.json()),
      );

      setStats({
        students: Array.isArray(data[0]) ? data[0].length : 0,

        trainers: Array.isArray(data[1]) ? data[1].length : 0,

        courses: Array.isArray(data[2]) ? data[2].length : 0,

        enrollments: Array.isArray(data[3]) ? data[3].length : 0,

        payments: Array.isArray(data[4]) ? data[4].length : 0,

        attendance: Array.isArray(data[5]) ? data[5].length : 0,
      });
    } catch (error) {
      console.error("Dashboard data error:", error);
    }
  };

  // =========================
  // LOGIN SUCCESS
  // Login.jsx मधून user मिळाल्यावर
  // =========================

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setActivePage("Dashboard");
  };

  // =========================
  // LOGOUT
  // Token आणि user information
  // remove करण्यासाठी
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setActivePage("Dashboard");
  };

  // =========================
  // SIDEBAR MENU
  // =========================

  const menuItems = [
    {
      name: "Dashboard",
      icon: "🏠",
    },
    {
      name: "Students",
      icon: "👨‍🎓",
    },
    {
      name: "Trainers",
      icon: "👨‍🏫",
    },
    {
      name: "Courses",
      icon: "📚",
    },
    {
      name: "Enrollments",
      icon: "📝",
    },
    {
      name: "Payments",
      icon: "💰",
    },
    {
      name: "Attendance",
      icon: "📅",
    },
  ];

  // =========================
  // DASHBOARD
  // =========================

  const renderDashboard = () => {
    return (
      <>
        <div className="page-header">
          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome back, <strong>{user?.name}</strong>
            </p>
          </div>

          <button className="refresh-btn" onClick={fetchDashboardData}>
            ↻ Refresh
          </button>
        </div>

        {/* Statistics */}

        <div className="stats-grid">
          <StatCard title="Total Students" value={stats.students} icon="👨‍🎓" />

          <StatCard title="Total Trainers" value={stats.trainers} icon="👨‍🏫" />

          <StatCard title="Total Courses" value={stats.courses} icon="📚" />

          <StatCard title="Enrollments" value={stats.enrollments} icon="📝" />

          <StatCard title="Payments" value={stats.payments} icon="💰" />

          <StatCard title="Attendance" value={stats.attendance} icon="📅" />
        </div>

        {/* Dashboard Cards */}

        <div className="dashboard-grid">
          <div className="welcome-card">
            <h2>Training Institute Management</h2>

            <p>
              Manage students, trainers, courses, enrollments, payments and
              attendance from one place.
            </p>

            <button
              className="primary-btn"
              onClick={() => setActivePage("Students")}
            >
              Manage Students
            </button>
          </div>

          <div className="quick-card">
            <h2>Quick Overview</h2>

            <div className="overview-row">
              <span>Students</span>

              <strong>{stats.students}</strong>
            </div>

            <div className="overview-row">
              <span>Trainers</span>

              <strong>{stats.trainers}</strong>
            </div>

            <div className="overview-row">
              <span>Courses</span>

              <strong>{stats.courses}</strong>
            </div>

            <div className="overview-row">
              <span>Enrollments</span>

              <strong>{stats.enrollments}</strong>
            </div>

            <div className="overview-row">
              <span>Payments</span>

              <strong>{stats.payments}</strong>
            </div>

            <div className="overview-row">
              <span>Attendance</span>

              <strong>{stats.attendance}</strong>
            </div>
          </div>
        </div>
      </>
    );
  };

  // =========================
  // PAGE ROUTING
  // =========================

  const renderPage = () => {
    if (activePage === "Dashboard") {
      return renderDashboard();
    }

    if (activePage === "Students") {
      return <StudentManagement />;
    }

    if (activePage === "Trainers") {
      return <TrainerManagement />;
    }

    if (activePage === "Courses") {
      return <CourseManagement />;
    }

    if (activePage === "Enrollments") {
      return <EnrollmentManagement />;
    }

    if (activePage === "Payments") {
      return <PaymentManagement />;
    }

    if (activePage === "Attendance") {
      return <AttendanceManagement />;
    }

    return null;
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">🎓</div>

          <h2>Loading TrainingHub...</h2>
        </div>
      </div>
    );
  }

  // =========================
  // NOT LOGGED IN
  // Login page दाखवणे
  // =========================

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // =========================
  // LOGGED IN APPLICATION
  // =========================

  return (
    <div className="app-container">
      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🎓</div>

          <div>
            <h2>TrainingHub</h2>

            <span>Management System</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-title">MAIN MENU</p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.name ? "active" : ""}`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>

              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* =========================
            USER PROFILE
        ========================= */}

        <div className="sidebar-footer">
          <div className="admin-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{user?.name}</strong>

            <span>{user?.role || "User"}</span>
          </div>
        </div>
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="system-status">
              <span className="status-dot"></span>
              System Online
            </span>
          </div>

          <div className="topbar-right">
            <span>{user?.email}</span>

            <div className="profile-circle">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <section className="content-area">{renderPage()}</section>
      </main>
    </div>
  );
}

// =========================
// STAT CARD
// =========================

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div className="stat-info">
        <p>{title}</p>

        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default App;
