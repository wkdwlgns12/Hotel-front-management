import axiosClient from "./axiosClient";

export const adminAuthApi = {
  login: (credentials) => axiosClient.post("/auth/login", credentials), // 백엔드 경로에 맞춰 수정 (예: /admin/auth/login 등)
  businessSignup: (data) => axiosClient.post("/auth/business/signup", data),
  logout: () => axiosClient.post("/auth/logout"),
  getMyInfo: () => axiosClient.get("/auth/me"),
  changePassword: (data) => axiosClient.put("/auth/password", data),
  forgotPassword: (email) => axiosClient.post("/auth/forgot-password", { email }),
};

export default adminAuthApi;