import { useEffect, useState } from "react";
import API from "../api/axios";

export default function MyApplications() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const res = await API.get("/applications/me");
      setApps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 text-white">
      <h2 className="text-2xl mb-4">My Applications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : apps.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        apps.map((app: any) => (
          <div key={app._id} className="bg-gray-800 p-4 mb-3 rounded">
            <p>Job ID: {app.job_id}</p>
            <p>Status: <b>{app.status}</b></p>
          </div>
        ))
      )}
    </div>
  );
}