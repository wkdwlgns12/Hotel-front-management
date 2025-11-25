import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockReviewApi } from "../../api/mockApi";
import Loader from "../../components/common/Loader";

const AdminReviewDetailPage = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReview();
  }, [reviewId]);

  const loadReview = async () => {
    try {
      setLoading(true);
      const data = await mockReviewApi.getReviewById(reviewId);
      setReview(data);
    } catch (error) {
      console.error("리뷰 정보 로드 실패:", error);
      alert("리뷰 정보를 불러올 수 없습니다.");
      navigate("/admin/reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("이 리뷰를 삭제하시겠습니까?")) return;
    try {
      await mockReviewApi.deleteReview(reviewId);
      alert("리뷰가 삭제되었습니다.");
      navigate("/admin/reviews");
    } catch (error) {
      alert("삭제에 실패했습니다.");
    }
  };

  const handleReport = async (action) => {
    if (!confirm(action === "approve" ? "신고를 기각하시겠습니까?" : "리뷰를 삭제하시겠습니까?")) return;
    try {
      await mockReviewApi.handleReport(reviewId, action);
      if (action === "delete") {
        alert("리뷰가 삭제되었습니다.");
        navigate("/admin/reviews");
      } else {
        alert("신고가 기각되었습니다.");
        loadReview();
      }
    } catch (error) {
      alert("처리에 실패했습니다.");
    }
  };

  const formatDateTime = (dateStr) => new Date(dateStr).toLocaleString('ko-KR');
  const renderStars = (rating) => "⭐".repeat(rating) + "☆".repeat(5 - rating);

  if (loading) return <Loader fullScreen />;
  if (!review) return null;

  return (
    <div className="admin-detail-page">
      <div className="page-header">
        <div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate("/admin/reviews")}>
            ← 목록으로
          </button>
          <h1>리뷰 상세</h1>
          <p className="page-description">{review.hotelName}에 대한 리뷰</p>
        </div>
        <div className="header-actions">
          {review.reported ? (
            <>
              <button className="btn btn-success" onClick={() => handleReport("approve")}>✅ 신고 기각</button>
              <button className="btn btn-danger" onClick={() => handleReport("delete")}>🗑️ 삭제</button>
            </>
          ) : (
            <button className="btn btn-danger" onClick={handleDelete}>🗑️ 삭제</button>
          )}
        </div>
      </div>

      {review.reported && (
        <div className="alert alert-danger">
          <strong>🚨 신고된 리뷰</strong>
          <p>신고 사유: {review.reportReason || "사유 없음"}</p>
        </div>
      )}

      <div className="detail-grid">
        <div className="detail-card full-width">
          <h2>📝 리뷰 내용</h2>
          <div className="detail-content">
            <div className="review-detail-header">
              <div className="rating-large">{renderStars(review.rating)} <span>{review.rating}/5</span></div>
            </div>
            <div className="review-detail-body">
              <h3>{review.title}</h3>
              <p className="review-comment">{review.comment}</p>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h2>👤 작성자 정보</h2>
          <div className="detail-content">
            <div className="detail-row"><span className="label">작성자</span><span className="value">{review.guestName}</span></div>
            <div className="detail-row"><span className="label">이메일</span><span className="value">{review.guestEmail}</span></div>
            <div className="detail-row"><span className="label">작성일시</span><span className="value">{formatDateTime(review.createdAt)}</span></div>
            <div className="detail-row"><span className="label">도움이 됨</span><span className="value">👍 {review.helpfulCount}명</span></div>
          </div>
        </div>

        <div className="detail-card">
          <h2>🏨 호텔 정보</h2>
          <div className="detail-content">
            <div className="detail-row"><span className="label">호텔명</span><span className="value">{review.hotelName}</span></div>
            <div className="detail-row"><span className="label">예약번호</span><span className="value">{review.bookingId}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviewDetailPage;
