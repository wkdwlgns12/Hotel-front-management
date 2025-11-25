import { Link } from "react-router-dom";

const AdminCouponTable = ({ coupons, onDelete }) => {
  const getStatusBadge = (status) => {
    const config = {
      active: { label: "진행중", class: "success" },
      expired: { label: "만료됨", class: "secondary" },
      scheduled: { label: "예정됨", class: "warning" }
    };
    const badge = config[status] || { label: status, class: "secondary" };
    return <span className={`badge badge-${badge.class}`}>{badge.label}</span>;
  };

  return (
    <div className="table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>쿠폰명</th>
            <th>코드</th>
            <th>할인혜택</th>
            <th>사용기간</th>
            <th>사용현황</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>
                <div style={{ fontWeight: 500 }}>{coupon.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{coupon.description}</div>
              </td>
              <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{coupon.code}</code></td>
              <td>
                {coupon.type === 'percent' ? `${coupon.discount}%` : `₩${coupon.discount.toLocaleString()}`} 할인
                <div style={{ fontSize: '11px', color: '#888' }}>
                  최소 ₩{coupon.minOrderAmount?.toLocaleString()} 주문 시
                </div>
              </td>
              <td style={{ fontSize: '13px' }}>
                {coupon.startDate} ~ <br/>{coupon.endDate}
              </td>
              <td>
                {coupon.usedCount} / {coupon.usageLimit}
                <div style={{ width: '100%', height: '4px', background: '#e2e8f0', marginTop: '4px', borderRadius: '2px' }}>
                  <div style={{ 
                    width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%`, 
                    height: '100%', 
                    background: '#3b82f6', 
                    borderRadius: '2px' 
                  }}></div>
                </div>
              </td>
              <td>{getStatusBadge(coupon.status)}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/admin/coupons/${coupon.id}/edit`} className="btn btn-outline-sm">수정</Link>
                  <button onClick={() => onDelete(coupon.id)} className="btn btn-danger-sm">삭제</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="7" className="text-center py-4">등록된 쿠폰이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponTable;