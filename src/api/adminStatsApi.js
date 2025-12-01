import axiosClient from "./axiosClient";

export const adminStatsApi = {
  getDashboardStats: () => axiosClient.get("/stats/dashboard"),
  getRevenueStats: (params) => axiosClient.get("/stats/revenue", { params }),
  getBookingStats: (params) => axiosClient.get("/stats/bookings", { params }),
  getUserStats: (params) => axiosClient.get("/stats/users", { params }),
  getHotelStats: (params) => axiosClient.get("/stats/hotels", { params }),
};

export default adminStatsApi;