import axiosClient from "./axiosClient";
import { mockBookingApi } from "./mockApi";

const USE_MOCK = false;

export const adminBookingApi = {
  getBookings: (params) => {
    if (USE_MOCK) return mockBookingApi.getBookings(params);
    return axiosClient.get("/admin/bookings", { params });
  },
  getBookingById: (bookingId) => {
    if (USE_MOCK) return mockBookingApi.getBookingById(bookingId);
    return axiosClient.get(`/admin/bookings/${bookingId}`);
  },
  updateBookingStatus: (bookingId, status) => {
    if (USE_MOCK) return mockBookingApi.updateBookingStatus(bookingId, status);
    return axiosClient.put(`/admin/bookings/${bookingId}/status`, { status });
  },
  cancelBooking: (bookingId, reason) => {
    if (USE_MOCK) return mockBookingApi.cancelBooking(bookingId, reason);
    return axiosClient.post(`/admin/bookings/${bookingId}/cancel`, { reason });
  },
  deleteBooking: (bookingId) => {
    if (USE_MOCK) return mockBookingApi.deleteBooking(bookingId);
    return axiosClient.delete(`/admin/bookings/${bookingId}`);
  },
};

export default adminBookingApi;