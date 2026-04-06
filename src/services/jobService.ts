import API from "../api/axios";

export const getJobs = () => API.get("/jobs/");

export const createJob = (data: any) => API.post("/jobs", data);