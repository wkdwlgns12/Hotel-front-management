import { Link } from "react-router-dom";

const AdminReviewTable = ({ reviews, onStatusChange, onDelete }) => {
  return (
    <div className="table-wrapper card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>호텔명</th>
            <th>작성자</th>
            <th>별점</th>
            <th style={{width: '35%'}}>내용</th>
            <th>상태</th>
            <th style={{width: '180px'}}>관리</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.hotelName}</td>
              <td>{review.guestName}</td>
              <td style={{ color: '#f59e0b' }}>{"⭐".repeat(review.rating)}</td>
              <td>
                {/* 여기 글자 색상을 파란색(#2563eb)으로 변경했습니다 */}
                <Link to={`/admin/reviews/${review.id}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
                  {review.title}
                </Link>
              </td>
              <td>
                <span className={`badge ${
                  review.status === 'approved' ? 'badge-success' : 
                  review.status === 'rejected' ? 'badge-danger' : 'badge-warning'
                }`}>
                  {review.status === 'approved' ? '승인됨' : review.status === 'rejected' ? '거부됨' : '대기중'}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {review.status === 'pending' && (
                    <>
                      <button className="btn btn-primary" style={{padding:'4px 8px', fontSize:'0.8rem', background:'#10b981', border:'none'}} onClick={() => onStatusChange(review.id, 'approved')}>승인</button>
                      <button className="btn btn-primary" style={{padding:'4px 8px', fontSize:'0.8rem', background:'#f59e0b', border:'none'}} onClick={() => onStatusChange(review.id, 'rejected')}>거부</button>
                    </>
                  )}
                  <button className="btn btn-danger-sm" onClick={() => onDelete(review.id)}>삭제</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviewTable;