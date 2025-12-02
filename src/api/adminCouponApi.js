import axiosClient from "./axiosClient";
import { mockCouponApi } from "./mockApi";

const USE_MOCK = false;

export const adminCouponApi = {
  getCoupons: () => {
    if (USE_MOCK) return mockCouponApi.getCoupons();
    return axiosClient.get("/admin/coupons");
  },
  getCouponById: (id) => {
    if (USE_MOCK) return mockCouponApi.getCouponById(id);
    return axiosClient.get(`/admin/coupons/${id}`);
  },
  createCoupon: (data) => {
    if (USE_MOCK) return mockCouponApi.createCoupon(data);
    return axiosClient.post("/admin/coupons", data);
  },
  updateCoupon: (id, data) => {
    if (USE_MOCK) return mockCouponApi.updateCoupon(id, data);
    return axiosClient.put(`/admin/coupons/${id}`, data);
  },
  deleteCoupon: (id) => {
    if (USE_MOCK) return mockCouponApi.deleteCoupon(id);
    return axiosClient.delete(`/admin/coupons/${id}`);
  },
};

export default adminCouponApi;