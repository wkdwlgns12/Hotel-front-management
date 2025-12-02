import { useState, useEffect } from "react";
import AdminBookingTable from "../../components/admin/bookings/AdminBookingTable"; // 기존 컴포넌트가 없다면 리스트페이지 로직 사용
import { mockBookingApi } from "../../api/mockApi";

const BusinessBookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    mockBookingApi.getBookings().then((res) => setBookings(res.bookings.slice(0, 3))); // 일부 데이터만
  }, []);

  const handleStatus = (id, status) => {
    alert(`예약을 ${status === 'confirmed' ? '승인' : '거절'} 처리했습니다.`);
    setBookings(bookings.map(b => b.id === id ? { ...b, status: status } : b));
  };

  return (
    <div>
      <div className="page-header"><h1>📅 예약 관리</h1></div>
      {/* 테이블 UI 직접 구현 (AdminBookingListPage 로직 재사용) */}
      <div className="table-wrapper card">
        <table className="admin-table">
          <thead><tr><th>예약자</th><th>체크인/아웃</th><th>금액</th><th>상태</th><th>관리</th></tr></thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.guestName}</td>
                <td>{b.checkIn} ~ {b.checkOut}</td>
                <td>₩{b.totalAmount.toLocaleString()}</td>
                <td><span className="badge badge-secondary">{b.status}</span></td>
                <td>
                  {b.status === 'pending' && (
                    <div style={{display:'flex', gap:'5px'}}>
                      <button className="btn btn-success-sm" onClick={()=>handleStatus(b.id, 'confirmed')}>승인</button>
                      <button className="btn btn-danger-sm" onClick={()=>handleStatus(b.id, 'cancelled')}>거절</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessBookingPage;