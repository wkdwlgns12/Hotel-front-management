import axiosClient from "./axiosClient";

export const adminReviewApi = {
  getReviews: (params) => axiosClient.get("/reviews", { params }),
  getReviewById: (reviewId) => axiosClient.get(`/reviews/${reviewId}`),
  deleteReview: (reviewId) => axiosClient.delete(`/reviews/${reviewId}`),
  rejectReport: (reviewId, reason) => axiosClient.post(`/reviews/${reviewId}/reject`, { reason }),
  reportReview: (reviewId, reason) => axiosClient.post(`/reviews/${reviewId}/report`, { reason }),
};

export default adminReviewApi;