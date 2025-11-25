import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockHotelApi } from "../../api/mockApi";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

const AdminHotelListPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    region: ""
  });

  useEffect(() => {
    loadHotels();
  }, [filters, currentPage]);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const data = await mockHotelApi.getHotels({ ...filters, page: currentPage });
      setHotels(data.hotels);
      setTotalPages(data.totalPages);
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
        const reason = prompt("거부 사유를 입력해주세요:");
        if (reason) {
          await mockHotelApi.rejectHotel(hotelId, reason);
        } else {
          return;
        }
      }
      loadHotels();
    } catch (error) {
      console.error("호텔 상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (hotelId, hotelName) => {
    if (!confirm(`"${hotelName}" 호텔을 삭제하시겠습니까?`)) return;
    
    try {
      await mockHotelApi.deleteHotel(hotelId);
      loadHotels();
      alert("호텔이 삭제되었습니다.");
    } catch (error) {
      console.error("호텔 삭제 실패:", error);
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
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ search: "", status: "", region: "" });
    setCurrentPage(1);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>🏨 호텔 관리</h1>
          <p className="page-description">등록된 전체 호텔을 관리합니다</p>
        </div>
      </div>

      {/* 필터 영역 */}
      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>호텔명 검색</label>
            <input
              type="text"
              placeholder="호텔명으로 검색..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          
          <div className="filter-item">
            <label>상태</label>
            <select 
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">전체 상태</option>
              <option value="approved">승인완료</option>
              <option value="pending">승인대기</option>
              <option value="rejected">승인거부</option>
            </select>
          </div>

          <div className="filter-item">
            <label>지역</label>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange("region", e.target.value)}
            >
              <option value="">전체 지역</option>
              <option value="서울">서울</option>
              <option value="부산">부산</option>
              <option value="제주">제주</option>
              <option value="경기">경기</option>
              <option value="강원">강원</option>
              <option value="인천">인천</option>
            </select>
          </div>

          <div className="filter-item filter-actions">
            <button className="btn btn-outline" onClick={clearFilters}>
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* 호텔 목록 */}
      {loading ? (
        <Loader />
      ) : hotels.length > 0 ? (
        <>
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>호텔 정보</th>
                  <th>지역</th>
                  <th>카테고리</th>
                  <th>객실수</th>
                  <th>평점</th>
                  <th>가격대</th>
                  <th>상태</th>
                  <th>등록일</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map(hotel => (
                  <tr key={hotel.id}>
                    <td>
                      <div className="hotel-info-cell">
                        <div 
                          className="hotel-name clickable"
                          onClick={() => navigate(`/admin/hotels/${hotel.id}`)}
                        >
                          {hotel.name}
                        </div>
                        <div className="hotel-address">{hotel.address}</div>
                      </div>
                    </td>
                    <td>{hotel.region}</td>
                    <td><span className="category-badge">{hotel.category}</span></td>
                    <td className="text-center">{hotel.rooms}실</td>
                    <td>
                      <div className="rating-cell">
                        ⭐ {hotel.rating}
                        <span className="review-count">({hotel.reviewCount})</span>
                      </div>
                    </td>
                    <td className="price-cell">
                      ₩{hotel.price.min.toLocaleString()} ~ ₩{hotel.price.max.toLocaleString()}
                    </td>
                    <td>{getStatusBadge(hotel.status)}</td>
                    <td>{hotel.createdAt}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => navigate(`/admin/hotels/${hotel.id}`)}
                          title="상세보기"
                        >
                          👁️
                        </button>
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => navigate(`/admin/hotels/${hotel.id}/edit`)}
                          title="수정"
                        >
                          ✏️
                        </button>
                        
                        {hotel.status === "pending" && (
                          <>
                            <button 
                              className="btn btn-success btn-sm"
                              onClick={() => handleStatusChange(hotel.id, "approved")}
                              title="승인"
                            >
                              ✅
                            </button>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => handleStatusChange(hotel.id, "rejected")}
                              title="거부"
                            >
                              ❌
                            </button>
                          </>
                        )}
                        
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(hotel.id, hotel.name)}
                          title="삭제"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🏨</div>
          <p>조건에 맞는 호텔이 없습니다.</p>
          <button className="btn btn-outline" onClick={clearFilters}>
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHotelListPage;
