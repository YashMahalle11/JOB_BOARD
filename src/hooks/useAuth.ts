export const useAuth = () => {
  const token = localStorage.getItem("access_token");

  if (!token) return { user: null, role: null };

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      user: payload,
      role: payload.role,
    };
  } catch {
    return { user: null, role: null };
  }
};