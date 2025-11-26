import { useState, useEffect } from "react";
import { mockHotelApi } from "../../api/mockApi";
import { useNavigate } from "react-router-dom";

const AdminHotelListPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "", region: "" });
  const navigate = useNavigate();

  useEffect(() => { loadHotels(); }, [filters]);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const data = await mockHotelApi.getHotels(filters);
      setHotels(data.hotels);
    } catch (error) { console.error("로드 실패", error); } 
    finally { setLoading(false); }
  };

  const handleStatusChange = async (hotelId, newStatus) => {
    if(!confirm(`정말 ${newStatus === 'approved' ? '승인' : '거부'} 하시겠습니까?`)) return;
    try {
      if (newStatus === "approved") await mockHotelApi.approveHotel(hotelId);
      else if (newStatus === "rejected") await mockHotelApi.rejectHotel(hotelId);
      loadHotels();
    } catch (error) { alert("처리 실패"); }
  };

  const getStatusBadge = (status) => {
    const map = { approved: { l: "운영중", c: "success" }, pending: { l: "승인대기", c: "warning" }, rejected: { l: "승인거부", c: "danger" } };
    const conf = map[status] || { l: status, c: "secondary" };
    return <span className={`badge badge-${conf.c}`}>{conf.l}</span>;
  };

  return (
    <div className="admin-hotel-page">
      <div className="page-header">
        <h1>🏨 전체 호텔 관리</h1>
        <button className="btn btn-primary" onClick={() => navigate('/admin/hotels/new')}>+ 호텔 등록</button>
      </div>

      <div className="filter-section card">
        <div className="filter-grid">
          <input type="text" placeholder="호텔명 검색..." value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})} />
          <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
            <option value="">전체 상태</option>
            <option value="approved">운영중</option>
            <option value="pending">승인대기</option>
            <option value="rejected">승인거부</option>
          </select>
          <select value={filters.region} onChange={(e) => setFilters({...filters, region: e.target.value})}>
            <option value="">전체 지역</option>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="제주">제주</option>
          </select>
        </div>
      </div>

      {loading ? <div className="loading">로딩 중...</div> : (
        <div className="hotels-grid">
          {hotels.map(hotel => (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-image">
                <img src={hotel.images[0] || "/api/placeholder/hotel.jpg"} alt={hotel.name} />
                <div className="hotel-status">{getStatusBadge(hotel.status)}</div>
              </div>
              <div className="hotel-content">
                <h3 className="hotel-name">{hotel.name}</h3>
                <p className="hotel-address">📍 {hotel.address}</p>
                <div className="hotel-info">
                  <span>{hotel.category}</span>
                  <span>⭐ {hotel.rating}</span>
                  <span>🛏️ {hotel.rooms}실</span>
                </div>
                <div className="hotel-actions">
                  <button className="btn btn-outline-sm" onClick={() => navigate(`/admin/hotels/${hotel.id}/edit`)}>📋 상세보기</button>
                  {hotel.status === "pending" && (
                    <>
                      <button className="btn btn-success-sm" onClick={() => handleStatusChange(hotel.id, "approved")}>승인</button>
                      <button className="btn btn-danger-sm" onClick={() => handleStatusChange(hotel.id, "rejected")}>거부</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHotelListPage;