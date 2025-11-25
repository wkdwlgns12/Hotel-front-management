import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockHotelApi } from "../../api/mockApi";
import Loader from "../../components/common/Loader";

const AdminHotelDetailPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHotel();
  }, [hotelId]);

  const loadHotel = async () => {
    try {
      setLoading(true);
      const data = await mockHotelApi.getHotelById(hotelId);
      setHotel(data);
    } catch (error) {
      console.error("호텔 정보 로드 실패:", error);
      alert("호텔 정보를 불러올 수 없습니다.");
      navigate("/admin/hotels");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      if (newStatus === "approved") {
        await mockHotelApi.approveHotel(hotelId);
        alert("호텔이 승인되었습니다.");
      } else if (newStatus === "rejected") {
        const reason = prompt("거부 사유를 입력해주세요:");
        if (reason) {
          await mockHotelApi.rejectHotel(hotelId, reason);
          alert("호텔이 거부되었습니다.");
        } else {
          return;
        }
      }
      loadHotel();
    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!confirm(`"${hotel.name}" 호텔을 삭제하시겠습니까?`)) return;
    
    try {
      await mockHotelApi.deleteHotel(hotelId);
      alert("호텔이 삭제되었습니다.");
      navigate("/admin/hotels");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      approved: { label: "승인완료", class: "success" },
      pending: { label: "승인대기", class: "warning" },
      rejected: { label: "승인거부", class: "danger" }
    };
    const config = statusMap[status] || { label: status, class: "secondary" };
    return <span className={`badge ${config.class} badge-lg`}>{config.label}</span>;
  };

  if (loading) return <Loader fullScreen />;
  if (!hotel) return null;

  return (
    <div className="admin-detail-page">
      <div className="page-header">
        <div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate("/admin/hotels")}>
            ← 목록으로
          </button>
          <h1>{hotel.name}</h1>
          <p className="page-description">{hotel.address}</p>
        </div>
        <div className="header-actions">
          {hotel.status === "pending" && (
            <>
              <button 
                className="btn btn-success"
                onClick={() => handleStatusChange("approved")}
              >
                ✅ 승인
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleStatusChange("rejected")}
              >
                ❌ 거부
              </button>
            </>
          )}
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/admin/hotels/${hotelId}/edit`)}
          >
            ✏️ 수정
          </button>
          <button 
            className="btn btn-danger"
            onClick={handleDelete}
          >
            🗑️ 삭제
          </button>
        </div>
      </div>

      <div className="detail-grid">
        {/* 기본 정보 */}
        <div className="detail-card">
          <h2>📋 기본 정보</h2>
          <div className="detail-content">
            <div className="detail-row">
              <span className="label">상태</span>
              <span className="value">{getStatusBadge(hotel.status)}</span>
            </div>
            <div className="detail-row">
              <span className="label">지역</span>
              <span className="value">{hotel.region}</span>
            </div>
            <div className="detail-row">
              <span className="label">카테고리</span>
              <span className="value">{hotel.category}</span>
            </div>
            <div className="detail-row">
              <span className="label">객실 수</span>
              <span className="value">{hotel.rooms}실</span>
            </div>
            <div className="detail-row">
              <span className="label">평점</span>
              <span className="value">⭐ {hotel.rating} ({hotel.reviewCount}개 리뷰)</span>
            </div>
            <div className="detail-row">
              <span className="label">가격대</span>
              <span className="value">₩{hotel.price.min.toLocaleString()} ~ ₩{hotel.price.max.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="label">등록일</span>
              <span className="value">{hotel.createdAt}</span>
            </div>
          </div>
        </div>

        {/* 연락처 정보 */}
        <div className="detail-card">
          <h2>📞 연락처 정보</h2>
          <div className="detail-content">
            <div className="detail-row">
              <span className="label">전화번호</span>
              <span className="value">{hotel.contact.phone}</span>
            </div>
            <div className="detail-row">
              <span className="label">이메일</span>
              <span className="value">{hotel.contact.email}</span>
            </div>
          </div>
        </div>

        {/* 사업자 정보 */}
        <div className="detail-card">
          <h2>🏢 사업자 정보</h2>
          <div className="detail-content">
            <div className="detail-row">
              <span className="label">사업자명</span>
              <span className="value">{hotel.ownerInfo.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">사업자번호</span>
              <span className="value">{hotel.ownerInfo.businessNumber}</span>
            </div>
          </div>
        </div>

        {/* 편의시설 */}
        <div className="detail-card full-width">
          <h2>🛎️ 편의시설</h2>
          <div className="detail-content">
            <div className="amenities-list">
              {hotel.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHotelDetailPage;
