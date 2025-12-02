import { mockCouponApi } from "./mockApi";

// 실제 API 연동 시 axiosClient 사용, 지금은 Mock 사용
const USE_MOCK = true;

export const adminCouponApi = {
  getCoupons: () => mockCouponApi.getCoupons(),
  getCouponById: (id) => mockCouponApi.getCouponById(id),
  createCoupon: (data) => mockCouponApi.createCoupon(data),
  updateCoupon: (id, data) => mockCouponApi.updateCoupon(id, data),
  deleteCoupon: (id) => mockCouponApi.deleteCoupon(id),
};

export default adminCouponApi;