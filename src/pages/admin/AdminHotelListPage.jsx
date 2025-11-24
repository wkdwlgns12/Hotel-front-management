import { useState, useEffect } from "react";
import { mockHotelApi } from "../../api/mockApi";
import { useNavigate } from "react-router-dom";

const AdminHotelListPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    region: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadHotels();
  }, [filters]);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const data = await mockHotelApi.getHotels(filters);
      setHotels(data.hotels);
    } catch (error) {
      console.error("호텔 목록 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (hotelId, newStatus) => {
    try {
      if (newStatus === "approved") {
        await mockHotelApi.approveHotel(hotelId);
      } else if (newStatus === "rejected") {
        await mockHotelApi.rejectHotel(hotelId, "관리자 검토 결과");
      }
      loadHotels(); // 목록 새로고침
    } catch (error) {
      console.error("호텔 상태 변경 실패:", error);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      approved: { label: "승인완료", class: "success" },
      pending: { label: "승인대기", class: "warning" },
      rejected: { label: "승인거부", class: "danger" }
    };
    const config = statusMap[status] || { label: status, class: "secondary" };
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  return (
    <div className="admin-hotel-page">
      <div className="page-header">
        <h1>🏨 호텔 관리</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/admin/hotels/new')}
        >
          ➕ 호텔 등록
        </button>
      </div>

      {/* 필터 영역 */}
      <div className="filter-section">
        <div className="filter-grid">
          <input
            type="text"
            placeholder="호텔명으로 검색..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">전체 상태</option>
            <option value="approved">승인완료</option>
            <option value="pending">승인대기</option>
            <option value="rejected">승인거부</option>
          </select>

          <select
            value={filters.region}
            onChange={(e) => setFilters({...filters, region: e.target.value})}
          >
            <option value="">전체 지역</option>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="제주">제주</option>
            <option value="경기">경기</option>
          </select>
        </div>
      </div>

      {/* 호텔 목록 */}
      {loading ? (
        <div className="loading">호텔 목록 로딩 중...</div>
      ) : (
        <div className="hotels-grid">
          {hotels.map(hotel => (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-image">
                <img 
                  src={hotel.images[0] || "/api/placeholder/hotel-default.jpg"} 
                  alt={hotel.name}
                />
                <div className="hotel-status">
                  {getStatusBadge(hotel.status)}
                </div>
              </div>
              
              <div className="hotel-content">
                <h3 className="hotel-name">{hotel.name}</h3>
                <p className="hotel-address">📍 {hotel.address}</p>
                
                <div className="hotel-info">
                  <span className="hotel-category">{hotel.category}</span>
                  <span className="hotel-rating">⭐ {hotel.rating} ({hotel.reviewCount})</span>
                  <span className="hotel-rooms">🛏️ {hotel.rooms}실</span>
                </div>

                <div className="hotel-price">
                  ₩{hotel.price.min.toLocaleString()} ~ ₩{hotel.price.max.toLocaleString()}
                </div>

                <div className="hotel-actions">
                  <button 
                    className="btn btn-outline-sm"
                    onClick={() => navigate(`/admin/hotels/${hotel.id}`)}
                  >
                    📋 상세보기
                  </button>
                  
                  {hotel.status === "pending" && (
                    <>
                      <button 
                        className="btn btn-success-sm"
                        onClick={() => handleStatusChange(hotel.id, "approved")}
                      >
                        ✅ 승인
                      </button>
                      <button 
                        className="btn btn-danger-sm"
                        onClick={() => handleStatusChange(hotel.id, "rejected")}
                      >
                        ❌ 거부
                      </button>
                    </>
                  )}
                  
                  <button 
                    className="btn btn-outline-sm"
                    onClick={() => navigate(`/admin/hotels/${hotel.id}/edit`)}
                  >
                    ✏️ 수정
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {hotels.length === 0 && !loading && (
        <div className="empty-state">
          <p>등록된 호텔이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AdminHotelListPage;