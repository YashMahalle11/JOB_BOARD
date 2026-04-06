import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function CompanyDashboard() {
  const { jobId } = useParams();
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    try {
      const res = await API.get(`/applications/job/${jobId}`);
      setApps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await API.put(`/applications/${id}`, { status });
    fetchApps();
  };

  return (
    <div className="p-5 text-white">
      <h2 className="text-2xl mb-3">Applicants</h2>

      {loading ? (
        <p>Loading...</p>
      ) : apps.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        apps.map((app: any) => (
          <div key={app._id} className="bg-gray-800 p-4 mt-3 rounded">
            <p>Applicant: {app.applicant_id}</p>
            <p>Status: <b>{app.status}</b></p>

            <div className="mt-2">
              <button
                onClick={() => updateStatus(app._id, "accepted")}
                className="bg-green-500 px-3 py-1 mr-2 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(app._id, "rejected")}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}