import { Link } from "react-router-dom";

const AdminReviewTable = ({ reviews, onDelete }) => {
  const getStatusBadge = (status, reported) => {
    if (reported) return <span className="badge badge-danger">신고됨</span>;
    if (status === 'approved') return <span className="badge badge-success">승인됨</span>;
    if (status === 'pending') return <span className="badge badge-warning">대기중</span>;
    return <span className="badge badge-secondary">{status}</span>;
  };

  return (
    <div className="table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>호텔명</th>
            <th>작성자</th>
            <th>별점</th>
            <th>내용</th>
            <th>작성일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.hotelName}</td>
              <td>{review.guestName}</td>
              <td style={{ color: '#f59e0b' }}>{"⭐".repeat(review.rating)}</td>
              <td>
                <Link to={`/admin/reviews/${review.id}`} style={{maxWidth: '200px', display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', verticalAlign: 'middle', textDecoration:'none', color:'#2563eb'}}>
                  {review.title}
                </Link>
              </td>
              <td>{new Date(review.createdAt).toLocaleDateString()}</td>
              <td>{getStatusBadge(review.status, review.reported)}</td>
              <td>
                <button 
                  className="btn btn-danger-sm"
                  onClick={() => onDelete(review.id)}
                  style={{padding:'4px 8px', fontSize:'12px', background:'#ef4444', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}
                >
                  삭제
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                리뷰 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviewTable;