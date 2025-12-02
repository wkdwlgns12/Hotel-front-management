import axiosClient from "./axiosClient";
import { mockUserApi } from "./mockApi";

const USE_MOCK = false;

export const adminUserApi = {
  getUsers: (params) => {
    if (USE_MOCK) return mockUserApi.getUsers(params);
    return axiosClient.get("/admin/users", { params });
  },
  getUserById: (userId) => {
    if (USE_MOCK) return mockUserApi.getUserById(userId);
    return axiosClient.get(`/admin/users/${userId}`);
  },
  updateUser: (userId, data) => {
    if (USE_MOCK) return mockUserApi.updateUser(userId, data);
    return axiosClient.put(`/admin/users/${userId}`, data);
  },
  deleteUser: (userId) => {
    if (USE_MOCK) return mockUserApi.deleteUser(userId);
    return axiosClient.delete(`/admin/users/${userId}`);
  },
  updateUserStatus: (userId, status) => {
    if (USE_MOCK) return mockUserApi.updateUserStatus(userId, status);
    return axiosClient.put(`/admin/users/${userId}/status`, { status });
  },
};

export default adminUserApi;