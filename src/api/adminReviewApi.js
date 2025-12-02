import axiosClient from "./axiosClient";
import { mockReviewApi } from "./mockApi";

const USE_MOCK = true;

export const adminReviewApi = {
  getReviews: (params) => {
    if (USE_MOCK) return mockReviewApi.getReviews(params);
    return axiosClient.get("/admin/reviews", { params });
  },
  getReviewById: (reviewId) => {
    if (USE_MOCK) return mockReviewApi.getReviewById(reviewId);
    return axiosClient.get(`/admin/reviews/${reviewId}`);
  },
  deleteReview: (reviewId) => {
    if (USE_MOCK) return mockReviewApi.deleteReview(reviewId);
    return axiosClient.delete(`/admin/reviews/${reviewId}`);
  },
  // ★ 신고 거부 (반려)
  rejectReport: (reviewId, reason) => {
    if (USE_MOCK) return mockReviewApi.rejectReport(reviewId, reason);
    return axiosClient.post(`/admin/reviews/${reviewId}/reject`, { reason });
  },
  // ★ 사업자 신고
  reportReview: (reviewId, reason) => {
      if (USE_MOCK) return mockReviewApi.reportReview(reviewId, reason);
      return axiosClient.post(`/business/reviews/${reviewId}/report`, { reason });
  }
};

export default adminReviewApi;