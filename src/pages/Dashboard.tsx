import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import JobCard from "../components/JobCard";

export default function Dashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      console.log("Jobs:", res.data); // 🔥 debug
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Jobs</h2>

      {/* 🔥 Loading State */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job: any) => (
          <JobCard key={job._id} job={job} />
        ))
      )}
    </div>
  );
}