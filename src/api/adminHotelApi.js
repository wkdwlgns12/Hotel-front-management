import axiosClient from "./axiosClient";

export const adminHotelApi = {
  getHotels: (params) => axiosClient.get("/hotels", { params }),
  getHotelById: (hotelId) => axiosClient.get(`/hotels/${hotelId}`),
  createHotel: (data) => axiosClient.post("/hotels", data),
  updateHotel: (hotelId, data) => axiosClient.put(`/hotels/${hotelId}`, data),
  deleteHotel: (hotelId) => axiosClient.delete(`/hotels/${hotelId}`),
  approveHotel: (hotelId) => axiosClient.post(`/hotels/${hotelId}/approve`),
  rejectHotel: (hotelId, reason) => axiosClient.post(`/hotels/${hotelId}/reject`, { reason }),
};

export default adminHotelApi;