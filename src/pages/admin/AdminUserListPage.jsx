import { useState, useEffect } from "react";
import { mockUserApi } from "../../api/mockApi";
import { useNavigate } from "react-router-dom";

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
    grade: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await mockUserApi.getUsers(filters);
      setUsers(data.users);
    } catch (error) {
      console.error("회원 목록 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await mockUserApi.updateUserStatus(userId, newStatus);
      loadUsers(); // 목록 새로고침
    } catch (error) {
      console.error("회원 상태 변경 실패:", error);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { label: "활성", class: "success" },
      inactive: { label: "비활성", class: "secondary" },
      suspended: { label: "정지", class: "danger" }
    };
    const config = statusMap[status] || { label: status, class: "secondary" };
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  const getGradeBadge = (grade) => {
    const gradeMap = {
      VVIP: { label: "VVIP", class: "purple" },
      VIP: { label: "VIP", class: "gold" },
      Gold: { label: "Gold", class: "warning" },
      Silver: { label: "Silver", class: "info" },
      Bronze: { label: "Bronze", class: "secondary" }
    };
    const config = gradeMap[grade] || { label: grade, class: "secondary" };
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  return (
    <div className="admin-user-page">
      <div className="page-header">
        <h1>👥 회원 관리</h1>
        <p>서비스 이용 회원을 관리하세요</p>
      </div>

      {/* 필터 영역 */}
      <div className="filter-section">
        <div className="filter-grid">
          <input
            type="text"
            placeholder="이름/이메일로 검색..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          
          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="suspended">정지</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">전체 유형</option>
            <option value="regular">일반회원</option>
            <option value="business">사업자회원</option>
          </select>

          <select
            value={filters.grade}
            onChange={(e) => setFilters({...filters, grade: e.target.value})}
          >
            <option value="">전체 등급</option>
            <option value="VVIP">VVIP</option>
            <option value="VIP">VIP</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>
      </div>

      {/* 회원 테이블 */}
      {loading ? (
        <div className="loading">회원 목록 로딩 중...</div>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>회원 정보</th>
                <th>연락처</th>
                <th>유형</th>
                <th>등급</th>
                <th>예약횟수</th>
                <th>총 결제금액</th>
                <th>가입일</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        <img src={user.avatar || "/api/placeholder/avatar-default.jpg"} alt={user.name} />
                      </div>
                      <div className="user-details">
                        <button 
                          className="link-button user-name"
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                        >
                          {user.name}
                        </button>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`type-badge ${user.type}`}>
                      {user.type === "regular" ? "일반" : "사업자"}
                    </span>
                  </td>
                  <td>{getGradeBadge(user.grade)}</td>
                  <td className="text-center">{user.totalBookings}회</td>
                  <td className="amount">₩{user.totalSpent.toLocaleString()}</td>
                  <td>{formatDate(user.joinDate)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    <div className="action-buttons">
                      {user.status === "active" && (
                        <button 
                          className="btn btn-warning-sm"
                          onClick={() => handleStatusChange(user.id, "suspended")}
                        >
                          🚫 정지
                        </button>
                      )}
                      
                      {user.status === "suspended" && (
                        <button 
                          className="btn btn-success-sm"
                          onClick={() => handleStatusChange(user.id, "active")}
                        >
                          ✅ 해제
                        </button>
                      )}
                      
                      {user.status === "inactive" && (
                        <button 
                          className="btn btn-info-sm"
                          onClick={() => handleStatusChange(user.id, "active")}
                        >
                          🔄 활성화
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

      {users.length === 0 && !loading && (
        <div className="empty-state">
          <p>조건에 맞는 회원이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AdminUserListPage;