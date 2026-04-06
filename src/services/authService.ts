import API from "../api/axios";

export const registerUser = (data: any) => {
  return API.post("/auth/register", data);
};

export const loginUser = async (data: any) => {
  const res = await API.post("/auth/login", data);

  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);

  // ❗ ADD THIS (IMPORTANT)
  const payload = JSON.parse(atob(res.data.access_token.split(".")[1]));
  localStorage.setItem("role", payload.role);

  return res.data;
};

 