import axiosClient from "./axiosClient";
import { mockReviewApi } from "./mockApi";

const USE_MOCK = false;

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
  rejectReport: (reviewId, reason) => {
    if (USE_MOCK) return mockReviewApi.rejectReport(reviewId, reason);
    return axiosClient.post(`/admin/reviews/${reviewId}/reject`, { reason });
  },
  reportReview: (reviewId, reason) => {
    if (USE_MOCK) return mockReviewApi.reportReview(reviewId, reason);
    return axiosClient.post(`/business/reviews/${reviewId}/report`, { reason });
  },
};

export default adminReviewApi;