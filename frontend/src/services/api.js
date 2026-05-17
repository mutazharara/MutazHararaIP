import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/auth/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get("/users/");
  return res.data;
};

export const getAllActivities = async () => {
  const res = await api.get("/users/activities");
  return res.data;
};

export const getUserActivities = async (userId) => {
  const res = await api.get(`/users/${userId}/activities`);
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/users/me", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put("/users/me/password", data);
  return res.data;
};

export const updateUserByAdmin = async (userId, data) => {
  const res = await api.put(`/users/${userId}`, data);
  return res.data;
};

export const toggleUserStatus = async (userId) => {
  const res = await api.patch(`/users/${userId}/toggle-active`);
  return res.data;
};

export const resetUserPassword = async (userId) => {
  const res = await api.patch(`/users/${userId}/reset-password`);
  return res.data;
};

export const parseVoiceExpense = async (text) => {
  const res = await api.post("/voice/parse-expense", { text });
  return res.data;
};

export default api;