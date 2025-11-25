import { useState, useEffect } from "react";
import { mockUserApi } from "../../api/mockApi";
import { useNavigate } from "react-router-dom";

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'regular', 'business'
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    grade: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [filters, activeTab]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      // 탭에 따라 type 필터 자동 적용
      const typeFilter = activeTab === 'all' ? '' : activeTab;
      const data = await mockUserApi.getUsers({ ...filters, type: typeFilter });
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
      loadUsers();
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
    return <span className={`badge badge-${config.class}`}>{config.label}</span>;
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
    return <span className={`badge badge-${config.class}`}>{config.label}</span>;
  };

  return (
    <div className="admin-user-page">
      <div className="page-header">
        <h1>👥 회원 관리</h1>
        <p>일반 회원 및 사업자 회원을 관리합니다.</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <button 
          onClick={() => setActiveTab("all")}
          className={`btn ${activeTab === "all" ? "btn-primary" : "btn-outline"}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: activeTab === "all" ? 'none' : '1px solid #e2e8f0' }}
        >
          전체 회원
        </button>
        <button 
          onClick={() => setActiveTab("regular")}
          className={`btn ${activeTab === "regular" ? "btn-primary" : "btn-outline"}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: activeTab === "regular" ? 'none' : '1px solid #e2e8f0' }}
        >
          👤 일반 회원
        </button>
        <button 
          onClick={() => setActiveTab("business")}
          className={`btn ${activeTab === "business" ? "btn-primary" : "btn-outline"}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: activeTab === "business" ? 'none' : '1px solid #e2e8f0' }}
        >
          🏢 사업자 회원
        </button>
      </div>

      {/* 필터 영역 */}
      <div className="filter-section">
        <div className="filter-grid">
          <input
            type="text"
            placeholder="이름/이메일 검색"
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
        <div className="loading">로딩 중...</div>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>회원 정보</th>
                <th>연락처</th>
                <th>유형</th>
                <th>등급</th>
                <th>활동 요약</th>
                <th>가입일</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={user.avatar || "/api/placeholder/avatar.jpg"} 
                        alt={user.name} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                      />
                      <div>
                        <button 
                          className="link-button"
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          style={{ fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          {user.name}
                        </button>
                        <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`badge ${user.type === "regular" ? "badge-secondary" : "badge-info"}`}>
                      {user.type === "regular" ? "일반" : "사업자"}
                    </span>
                  </td>
                  <td>{getGradeBadge(user.grade)}</td>
                  <td>
                    <div style={{ fontSize: '12px' }}>예약: {user.totalBookings}회</div>
                    <div style={{ fontSize: '12px', color: '#2563eb' }}>₩{user.totalSpent?.toLocaleString()}</div>
                  </td>
                  <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    <div className="action-buttons">
                      {user.status === "active" ? (
                        <button 
                          className="btn btn-warning-sm"
                          onClick={() => handleStatusChange(user.id, "suspended")}
                        >
                          정지
                        </button>
                      ) : (
                        <button 
                          className="btn btn-success-sm"
                          onClick={() => handleStatusChange(user.id, "active")}
                        >
                          해제
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
        <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
          <p>해당하는 회원이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AdminUserListPage;