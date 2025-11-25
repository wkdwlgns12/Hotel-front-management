import StatusBadge from "../../common/StatusBadge";

const AdminBookingDetail = ({ booking }) => {
  if (!booking) return null;

  return (
    <div className="booking-detail">
      <div className="card mb-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>예약 정보 ({booking.bookingNumber})</h3>
          <StatusBadge status={booking.status} type="booking" />
        </div>
        <div className="detail-section">
          <div className="detail-row">
            <div className="label">호텔명</div>
            <div className="value">{booking.hotelName}</div>
          </div>
          <div className="detail-row">
            <div className="label">객실 타입</div>
            <div className="value">{booking.roomType}</div>
          </div>
          <div className="detail-row">
            <div className="label">숙박 기간</div>
            <div className="value">{booking.checkIn} ~ {booking.checkOut} ({booking.nights}박)</div>
          </div>
          <div className="detail-row">
            <div className="label">투숙객</div>
            <div className="value">{booking.guests}명</div>
          </div>
          <div className="detail-row">
            <div className="label">총 결제금액</div>
            <div className="value" style={{ fontWeight: 'bold', color: '#2563eb' }}>₩{booking.totalAmount?.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>예약자 정보</h3>
        <div className="detail-section">
          <div className="detail-row">
            <div className="label">이름</div>
            <div className="value">{booking.guestName}</div>
          </div>
          <div className="detail-row">
            <div className="label">연락처</div>
            <div className="value">{booking.guestPhone}</div>
          </div>
          <div className="detail-row">
            <div className="label">이메일</div>
            <div className="value">{booking.guestEmail}</div>
          </div>
          <div className="detail-row">
            <div className="label">요청사항</div>
            <div className="value">{booking.specialRequests || "없음"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetail;