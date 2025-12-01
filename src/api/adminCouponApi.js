import axiosClient from "./axiosClient";

export const adminCouponApi = {
  getCoupons: () => axiosClient.get("/coupons"),
  getCouponById: (id) => axiosClient.get(`/coupons/${id}`),
  createCoupon: (data) => axiosClient.post("/coupons", data),
  updateCoupon: (id, data) => axiosClient.put(`/coupons/${id}`, data),
  deleteCoupon: (id) => axiosClient.delete(`/coupons/${id}`),
};

export default adminCouponApi;