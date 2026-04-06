import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../hooks/useAuth";

export default function CreateJob() {
  const { role } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔒 Role protection
  if (role !== "company") {
    return <p className="text-red-500 p-5">Access Denied ❌</p>;
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // ✅ Validation
    if (!form.title || !form.description || !form.location) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await API.post("/jobs/", form);

      alert("Job created successfully ✅");

      // 🔁 Redirect to dashboard
      navigate("/");

    } catch (err: any) {
      setError(err?.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-xl w-[400px] shadow-lg">

        <h2 className="text-2xl mb-4 font-bold text-center">
          Create Job
        </h2>

        {/* ❗ Error */}
        {error && <p className="text-red-400 mb-2">{error}</p>}

        {/* Title */}
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded text-black"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded text-black"
        />

        {/* Location */}
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded text-black"
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-500 py-2 rounded hover:bg-green-600"
        >
          {loading ? "Creating..." : "Create Job"}
        </button>

      </div>
    </div>
  );
}