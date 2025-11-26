import { useState, useEffect } from "react";
import AdminReviewFilter from "../../components/admin/reviews/AdminReviewFilter";
import AdminReviewTable from "../../components/admin/reviews/AdminReviewTable";
import { adminReviewApi } from "../../api/adminReviewApi";
import Loader from "../../components/common/Loader";

const AdminReviewListPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await adminReviewApi.getReviews(filters);
      setReviews(data.reviews || []);
    } finally { setLoading(false); }
  };

  const handleStatus = (id, status) => {
    // UI상에서 즉시 반영 (실제 API 연결 시 API 호출 필요)
    if(confirm(`리뷰를 ${status === 'approved' ? '승인' : '거부'} 하시겠습니까?`)){
        setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
    }
  };

  const handleDelete = async (id) => {
    if (confirm("정말 리뷰를 삭제하시겠습니까?")) {
      await adminReviewApi.deleteReview(id);
      fetchReviews();
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-review-page">
      <div className="page-header"><h1>⭐ 리뷰 관리</h1></div>
      <AdminReviewFilter filters={filters} onFilterChange={(f) => setFilters({...filters, ...f})} onSearch={fetchReviews} />
      <AdminReviewTable reviews={reviews} onStatusChange={handleStatus} onDelete={handleDelete} />
    </div>
  );
};

export default AdminReviewListPage;