import { Link } from "react-router-dom";

// readOnly prop 추가 (기본값 false)
const AdminCouponTable = ({ coupons, onDelete, readOnly = false }) => {
  return (
    <div className="table-wrapper card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>쿠폰명</th>
            <th>코드</th>
            <th>대상 등급</th>
            <th>할인 혜택</th>
            <th>기간</th>
            <th>상태</th>
            {/* 읽기 전용이 아닐 때만 관리 컬럼 표시 */}
            {!readOnly && <th>관리</th>}
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td style={{fontWeight:'bold'}}>{coupon.name}</td>
              <td><code style={{background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px'}}>{coupon.code}</code></td>
              <td>
                <span className="badge badge-info">
                  {coupon.targetGrade === 'all' ? '전체 회원' : `${coupon.targetGrade} 이상`}
                </span>
              </td>
              <td style={{color:'#2563eb'}}>
                {coupon.type === 'percent' ? `${coupon.discount}%` : `₩${coupon.discount.toLocaleString()}`} 할인
              </td>
              <td style={{fontSize:'0.9rem', color:'#64748b'}}>
                {coupon.startDate} ~ {coupon.endDate}
              </td>
              <td>
                <span className={`badge badge-${coupon.status === 'active' ? 'success' : 'secondary'}`}>
                  {coupon.status === 'active' ? '진행중' : '종료됨'}
                </span>
              </td>
              {/* 읽기 전용이 아닐 때만 수정/삭제 버튼 표시 */}
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
            <tr>
                {/* 컬럼 수에 맞춰 colspan 조정 */}
                <td colSpan={readOnly ? "6" : "7"} style={{textAlign:'center', padding:'20px'}}>
                    등록된 쿠폰이 없습니다.
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponTable;