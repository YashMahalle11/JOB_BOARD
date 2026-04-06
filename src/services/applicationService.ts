import API from "../api/axios";

export const applyToJob = (data: any) => {
  return API.post("/applications/", data);
};