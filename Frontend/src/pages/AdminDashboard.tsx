
import Navbar from "../components/Navbar";
import { useAppSelector } from "../hooks";
import { useState } from "react";

const AdminDashboard = () => {
  const selector = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("projects");

  const renderTabContent = () => {
    switch (activeTab) {
      case "projects":
        return <div>Projects content goes here.</div>;
      case "tasks":
        return <div>Tasks content goes here.</div>;
      case "users":
        return <div>Users content goes here.</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <h2>Admin Dashboard</h2>
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          <button
            onClick={() => setActiveTab("projects")}
            style={{
              background: activeTab === "projects" ? "#007bff" : "#f0f0f0",
              color: activeTab === "projects" ? "#fff" : "#333",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            style={{
              background: activeTab === "tasks" ? "#007bff" : "#f0f0f0",
              color: activeTab === "tasks" ? "#fff" : "#333",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab("users")}
            style={{
              background: activeTab === "users" ? "#007bff" : "#f0f0f0",
              color: activeTab === "users" ? "#fff" : "#333",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Users
          </button>
        </div>
        <div style={{ minHeight: "200px", background: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ marginBottom: "1rem" }}>Welcome, {selector.user?.fullName}!</div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;