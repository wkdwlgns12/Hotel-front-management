import axiosClient from "./axiosClient";
import { mockStatsApi } from "./mockApi";

const USE_MOCK = false;

export const adminStatsApi = {
  getDashboardStats: () => {
    if (USE_MOCK) return mockStatsApi.getDashboardStats();
    return axiosClient.get("/admin/stats/dashboard");
  },
  getRevenueStats: (params) => {
    if (USE_MOCK) return mockStatsApi.getRevenueStats(params);
    return axiosClient.get("/admin/stats/revenue", { params });
  },
  getBookingStats: (params) => {
    if (USE_MOCK) return mockStatsApi.getBookingStats(params);
    return axiosClient.get("/admin/stats/bookings", { params });
  },
  getUserStats: (params) => {
    if (USE_MOCK) return mockStatsApi.getUserStats(params);
    return axiosClient.get("/admin/stats/users", { params });
  },
  getHotelStats: (params) => {
    if (USE_MOCK) return mockStatsApi.getHotelStats(params);
    return axiosClient.get("/admin/stats/hotels", { params });
  },
};

export default adminStatsApi;