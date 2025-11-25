import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockReviewApi } from "../../api/mockApi";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

const AdminReviewListPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("all"); // all, reported
  const [filters, setFilters] = useState({
    search: "",
    rating: ""
  });

  useEffect(() => {
    loadReviews();
  }, [activeTab, filters, currentPage]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      let data;
      if (activeTab === "reported") {
        data = await mockReviewApi.getReportedReviews({ ...filters, page: currentPage });
      } else {
        data = await mockReviewApi.getReviews({ ...filters, page: currentPage });
      }
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("리뷰 목록 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm("이 리뷰를 삭제하시겠습니까?")) return;
    
    try {
      await mockReviewApi.deleteReview(reviewId);
      loadReviews();
      alert("리뷰가 삭제되었습니다.");
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleReport = async (reviewId, action) => {
    const actionLabels = {
      approve: "승인 (신고 기각)",
      delete: "삭제 (신고 수락)"
    };
    
    if (!confirm(`이 리뷰를 ${actionLabels[action]}하시겠습니까?`)) return;
    
    try {
      await mockReviewApi.handleReport(reviewId, action);
      loadReviews();
      alert("처리되었습니다.");
    } catch (error) {
      console.error("신고 처리 실패:", error);
      alert("처리에 실패했습니다.");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ search: "", rating: "" });
    setCurrentPage(1);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  const reportedCount = reviews.filter(r => r.reported).length;

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>⭐ 리뷰 관리</h1>
          <p className="page-description">호텔 리뷰를 관리하고 신고된 리뷰를 처리합니다</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="tab-menu">
        <button 
          className={`tab-item ${activeTab === "all" ? "active" : ""}`}
          onClick={() => handleTabChange("all")}
        >
          전체 리뷰
        </button>
        <button 
          className={`tab-item ${activeTab === "reported" ? "active" : ""}`}
          onClick={() => handleTabChange("reported")}
        >
          🚨 신고된 리뷰
          {reportedCount > 0 && <span className="tab-count danger">{reportedCount}</span>}
        </button>
      </div>

      {/* 필터 영역 */}
      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>검색</label>
            <input
              type="text"
              placeholder="호텔명 또는 작성자로 검색..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          
          <div className="filter-item">
            <label>평점</label>
            <select 
              value={filters.rating}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            >
              <option value="">전체 평점</option>
              <option value="5">⭐⭐⭐⭐⭐ (5점)</option>
              <option value="4">⭐⭐⭐⭐ (4점)</option>
              <option value="3">⭐⭐⭐ (3점)</option>
              <option value="2">⭐⭐ (2점)</option>
              <option value="1">⭐ (1점)</option>
            </select>
          </div>

          <div className="filter-item filter-actions">
            <button className="btn btn-outline" onClick={clearFilters}>
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* 리뷰 목록 */}
      {loading ? (
        <Loader />
      ) : reviews.length > 0 ? (
        <>
          <div className="review-list">
            {reviews.map(review => (
              <div key={review.id} className={`review-card ${review.reported ? "reported" : ""}`}>
                <div className="review-header">
                  <div className="review-hotel">
                    <h3>{review.hotelName}</h3>
                    {review.reported && (
                      <span className="badge danger">🚨 신고됨</span>
                    )}
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <div className="review-content">
                  <h4>{review.title}</h4>
                  <p>{review.comment}</p>
                </div>
                
                <div className="review-footer">
                  <div className="review-meta">
                    <span className="reviewer">
                      👤 {review.guestName} ({review.guestEmail})
                    </span>
                    <span className="review-date">
                      📅 {formatDate(review.createdAt)}
                    </span>
                    <span className="helpful-count">
                      👍 {review.helpfulCount}명이 도움이 됨
                    </span>
                  </div>
                  
                  <div className="review-actions">
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => navigate(`/admin/reviews/${review.id}`)}
                    >
                      👁️ 상세
                    </button>
                    
                    {review.reported ? (
                      <>
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={() => handleReport(review.id, "approve")}
                        >
                          ✅ 신고 기각
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReport(review.id, "delete")}
                        >
                          🗑️ 삭제
                        </button>
                      </>
                    ) : (
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(review.id)}
                      >
                        🗑️ 삭제
                      </button>
                    )}
                  </div>
                </div>
                
                {review.reported && review.reportReason && (
                  <div className="report-reason">
                    <strong>신고 사유:</strong> {review.reportReason}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <p>
            {activeTab === "reported" 
              ? "신고된 리뷰가 없습니다." 
              : "조건에 맞는 리뷰가 없습니다."}
          </p>
          <button className="btn btn-outline" onClick={clearFilters}>
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminReviewListPage;
