import { applyToJob } from "../services/applicationService";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }: any) {
  const { role } = useAuth();
  const navigate = useNavigate(); 

  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);

      await applyToJob({
        job_id: job._id,
        resume: "My Resume"
      });

      setApplied(true);
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded mb-4 text-white">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p>{job.description}</p>
      <p className="text-sm text-gray-400">{job.location}</p>

      {/* 👤 APPLICANT */}
      {role === "applicant" && (
        <button
          onClick={handleApply}
          disabled={applied || loading}
          className="mt-3 bg-blue-500 px-4 py-2 rounded"
        >
          {loading ? "Applying..." : applied ? "Applied ✅" : "Apply"}
        </button>
      )}

      {/* 🏢 COMPANY */}
      {role === "company" && (
        <button
          onClick={() => navigate(`/company/${job._id}`)}
          className="mt-3 bg-green-500 px-4 py-2 rounded"
        >
          View Applicants
        </button>
      )}
    </div>
  );
}