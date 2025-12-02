import axiosClient from "./axiosClient";
import { mockHotelApi } from "./mockApi";

const USE_MOCK = false;

export const adminHotelApi = {
  getHotels: (params) => {
    if (USE_MOCK) return mockHotelApi.getHotels(params);
    return axiosClient.get("/admin/hotels", { params });
  },
  getHotelById: (hotelId) => {
    if (USE_MOCK) return mockHotelApi.getHotelById(hotelId);
    return axiosClient.get(`/admin/hotels/${hotelId}`);
  },
  createHotel: (data) => {
    if (USE_MOCK) return mockHotelApi.createHotel(data);
    return axiosClient.post("/admin/hotels", data);
  },
  updateHotel: (hotelId, data) => {
    if (USE_MOCK) return mockHotelApi.updateHotel(hotelId, data);
    return axiosClient.put(`/admin/hotels/${hotelId}`, data);
  },
  deleteHotel: (hotelId) => {
    if (USE_MOCK) return mockHotelApi.deleteHotel(hotelId);
    return axiosClient.delete(`/admin/hotels/${hotelId}`);
  },
  approveHotel: (hotelId) => {
    if (USE_MOCK) return mockHotelApi.approveHotel(hotelId);
    return axiosClient.post(`/admin/hotels/${hotelId}/approve`);
  },
  rejectHotel: (hotelId, reason) => {
    if (USE_MOCK) return mockHotelApi.rejectHotel(hotelId, reason);
    return axiosClient.post(`/admin/hotels/${hotelId}/reject`, { reason });
  },
};

export default adminHotelApi;