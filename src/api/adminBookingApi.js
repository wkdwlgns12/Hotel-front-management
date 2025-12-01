import axiosClient from "./axiosClient";

export const adminBookingApi = {
  getBookings: (params) => axiosClient.get("/bookings", { params }),
  getBookingById: (bookingId) => axiosClient.get(`/bookings/${bookingId}`),
  updateBookingStatus: (bookingId, status) => axiosClient.put(`/bookings/${bookingId}/status`, { status }),
  cancelBooking: (bookingId, reason) => axiosClient.post(`/bookings/${bookingId}/cancel`, { reason }),
  deleteBooking: (bookingId) => axiosClient.delete(`/bookings/${bookingId}`),
};

export default adminBookingApi;