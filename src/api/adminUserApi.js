import axiosClient from "./axiosClient";

export const adminUserApi = {
  getUsers: (params) => axiosClient.get("/users", { params }),
  getUserById: (userId) => axiosClient.get(`/users/${userId}`),
  updateUser: (userId, data) => axiosClient.put(`/users/${userId}`, data),
  deleteUser: (userId) => axiosClient.delete(`/users/${userId}`),
  // ★ 활성/비활성 상태 변경 (백엔드 API 규격에 맞춰 수정 필요, 보통 PUT 사용)
  updateUserStatus: (userId, status) => axiosClient.put(`/users/${userId}/status`, { status }),
};

export default adminUserApi;