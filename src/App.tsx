import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyApplications from "./pages/MyApplications";
import CompanyDashboard from "./pages/CompanyDashboard";
import CreateJob from "./pages/CreateJob";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { role } = useAuth();  // ✅ HERE

  return (
    <BrowserRouter>
      
      {/* 🔥 NAVBAR */}
      <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/my-applications">My Applications</Link>

          {/* 🔥 ROLE-BASED */}
          {role === "company" && (
              <Link to="/create-job" style={{ marginLeft: "10px" }}>
                Create Job
              </Link>
           )}
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/company/:jobId" element={<CompanyDashboard />} />
        <Route path="/create-job" element={<CreateJob />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;