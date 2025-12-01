import { Link } from "react-router-dom";

const AdminCouponTable = ({ coupons, onDelete, readOnly = false }) => {
  return (
    <div className="table-wrapper card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>쿠폰명</th>
            <th>코드</th>
            <th>할인 혜택</th>
            <th>사용 조건 / 수량</th> {/* 변경됨 */}
            <th>기간</th>
            <th>상태</th>
            {!readOnly && <th>관리</th>}
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td style={{fontWeight:'bold'}}>{coupon.name}</td>
              <td><code style={{background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px'}}>{coupon.code}</code></td>
              <td style={{color:'#2563eb'}}>
                {coupon.type === 'percent' ? `${coupon.discount}%` : `₩${coupon.discount.toLocaleString()}`} 할인
              </td>
              <td>
                <div style={{fontSize:'0.9rem'}}>
                  {coupon.minOrderAmount > 0 ? `₩${coupon.minOrderAmount.toLocaleString()} 이상 구매 시` : "제한 없음"}
                </div>
                <div style={{fontSize:'0.8rem', color:'#64748b'}}>
                   총 {coupon.quantity || coupon.usageLimit}장 발행
                </div>
              </td>
              <td style={{fontSize:'0.9rem', color:'#64748b'}}>
                {coupon.startDate} ~ {coupon.endDate}
              </td>
              <td>
                <span className={`badge badge-${coupon.status === 'active' ? 'success' : 'secondary'}`}>
                  {coupon.status === 'active' ? '진행중' : '종료됨'}
                </span>
              </td>
              {!readOnly && (
                <td>
                  <div style={{display:'flex', gap:'5px'}}>
                      <Link to={`/admin/coupons/${coupon.id}/edit`} className="btn btn-outline" style={{padding:'4px 8px', fontSize:'0.8rem'}}>수정</Link>
                      <button onClick={() => onDelete(coupon.id)} className="btn btn-danger-sm">삭제</button>
                  </div>
                </td>
              )}
            </tr>
          )) : (
            <tr><td colSpan={readOnly ? "6" : "7"} style={{textAlign:'center', padding:'20px'}}>등록된 쿠폰이 없습니다.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponTable;