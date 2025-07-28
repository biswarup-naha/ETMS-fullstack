
import AdminSidebar from "../components/dashboard/AdminSidebar";
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
      <div className="flex w-full h-screen">
        <AdminSidebar />
        <h2 className="flex-1">Admin Dashboard</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;