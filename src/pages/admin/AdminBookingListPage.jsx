import { useState, useEffect } from "react";
import { mockBookingApi } from "../../api/mockApi";
import { useNavigate } from "react-router-dom";

const AdminBookingListPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    dateFrom: "",
    dateTo: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, [filters]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await mockBookingApi.getBookings(filters);
      setBookings(data.bookings);
    } catch (error) {
      console.error("예약 목록 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await mockBookingApi.updateBookingStatus(bookingId, newStatus);
      loadBookings(); // 목록 새로고침
    } catch (error) {
      console.error("예약 상태 변경 실패:", error);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      confirmed: { label: "확정", class: "success" },
      pending: { label: "대기", class: "warning" },
      cancelled: { label: "취소", class: "danger" },
      completed: { label: "완료", class: "info" }
    };
    const config = statusMap[status] || { label: status, class: "secondary" };
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  return (
    <div className="admin-booking-page">
      <div className="page-header">
        <h1>📅 예약 관리</h1>
        <p>호텔 예약 현황을 관리하세요</p>
      </div>

      {/* 필터 영역 */}
      <div className="filter-section">
        <div className="filter-grid">
          <input
            type="text"
            placeholder="예약자명/예약번호로 검색..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">전체 상태</option>
            <option value="confirmed">확정</option>
            <option value="pending">대기</option>
            <option value="cancelled">취소</option>
            <option value="completed">완료</option>
          </select>

          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
            placeholder="체크인 시작일"
          />

          <input
            type="date"
            value={filters.dateTo} 
            onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
            placeholder="체크인 종료일"
          />
        </div>
      </div>

      {/* 예약 테이블 */}
      {loading ? (
        <div className="loading">예약 목록 로딩 중...</div>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>예약번호</th>
                <th>예약자</th>
                <th>호텔명</th>
                <th>체크인/아웃</th>
                <th>박수</th>
                <th>인원</th>
                <th>금액</th>
                <th>상태</th>
                <th>예약일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>
                    <button 
                      className="link-button"
                      onClick={() => navigate(`/admin/bookings/${booking.id}`)}
                    >
                      {booking.bookingNumber}
                    </button>
                  </td>
                  <td>
                    <div className="guest-info">
                      <div className="guest-name">{booking.guestName}</div>
                      <div className="guest-contact">{booking.guestPhone}</div>
                    </div>
                  </td>
                  <td>{booking.hotelName}</td>
                  <td>
                    <div className="date-range">
                      <div>{formatDate(booking.checkIn)}</div>
                      <div>{formatDate(booking.checkOut)}</div>
                    </div>
                  </td>
                  <td>{booking.nights}박</td>
                  <td>{booking.guests}명</td>
                  <td className="amount">₩{booking.totalAmount.toLocaleString()}</td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>{formatDate(booking.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      {booking.status === "pending" && (
                        <button 
                          className="btn btn-success-sm"
                          onClick={() => handleStatusChange(booking.id, "confirmed")}
                        >
                          ✅ 확정
                        </button>
                      )}
                      
                      {booking.status === "confirmed" && (
                        <button 
                          className="btn btn-info-sm"
                          onClick={() => handleStatusChange(booking.id, "completed")}
                        >
                          ✔️ 완료
                        </button>
                      )}
                      
                      {["pending", "confirmed"].includes(booking.status) && (
                        <button 
                          className="btn btn-danger-sm"
                          onClick={() => handleStatusChange(booking.id, "cancelled")}
                        >
                          ❌ 취소
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {bookings.length === 0 && !loading && (
        <div className="empty-state">
          <p>조건에 맞는 예약이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AdminBookingListPage;