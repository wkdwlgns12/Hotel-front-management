import { useState, useEffect } from "react";
import AdminReviewFilter from "../../components/admin/reviews/AdminReviewFilter";
import AdminReviewTable from "../../components/admin/reviews/AdminReviewTable";
import { adminReviewApi } from "../../api/adminReviewApi";
import Loader from "../../components/common/Loader";

const AdminReviewListPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      // ★ 중요: 신고된(reported) 리뷰만 가져오도록 요청
      const data = await adminReviewApi.getReviews({ ...filters, reportedOnly: true });
      setReviews(data.reviews || []);
    } finally {
      setLoading(false);
    }
  };

  // 승인 = 삭제
  const handleApproveReport = async (id) => {
    if (confirm("신고를 승인하여 리뷰를 삭제하시겠습니까?")) {
      await adminReviewApi.deleteReview(id);
      alert("리뷰가 삭제되었습니다.");
      fetchReviews();
    }
  };

  // 거부 = 상태 변경 및 사유 입력
  const handleRejectReport = async (id) => {
    const reason = prompt("신고 거부 사유를 입력해주세요:");
    if (reason) {
        await adminReviewApi.rejectReport(id, reason);
        alert("신고가 거부(반려) 되었습니다.");
        fetchReviews();
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-review-page">
      <div className="page-header"><h1>⭐ 신고된 리뷰 관리</h1></div>
      
      <AdminReviewFilter 
        filters={filters} 
        onFilterChange={(f) => setFilters({...filters, ...f})} 
        onSearch={fetchReviews} 
      />
      
      <AdminReviewTable 
        reviews={reviews} 
        onApprove={handleApproveReport} 
        onReject={handleRejectReport} 
      />
    </div>
  );
};

export default AdminReviewListPage;