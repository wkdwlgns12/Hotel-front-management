import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockUserApi } from "../../api/mockApi";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

const AdminUserListPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // all, regular, business
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    grade: ""
  });

  // 탭별 회원 수 카운트
  const [counts, setCounts] = useState({
    all: 0,
    regular: 0,
    business: 0
  });

  useEffect(() => {
    loadUsers();
  }, [activeTab, filters, currentPage]);

  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts = async () => {
    try {
      const allData = await mockUserApi.getUsers({});
      const regularCount = allData.users.filter(u => u.type === "regular").length;
      const businessCount = allData.users.filter(u => u.type === "business").length;
      setCounts({
        all: allData.users.length,
        regular: regularCount,
        business: businessCount
      });
    } catch (error) {
      console.error("카운트 로드 실패:", error);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = { 
        ...filters, 
        page: currentPage,
        type: activeTab === "all" ? "" : activeTab
      };
      const data = await mockUserApi.getUsers(params);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("회원 목록 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, userName, newStatus) => {
    const statusLabels = {
      active: "활성화",
      suspended: "정지",
      inactive: "비활성화"
    };
    
    if (!confirm(`"${userName}" 회원을 ${statusLabels[newStatus]}하시겠습니까?`)) return;
    
    try {
      await mockUserApi.updateUserStatus(userId, newStatus);
      loadUsers();
      loadCounts();
      alert(`회원이 ${statusLabels[newStatus]}되었습니다.`);
    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async (userId, userName) => {
    if (!confirm(`"${userName}" 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) return;
    
    try {
      await mockUserApi.deleteUser(userId);
      loadUsers();
      loadCounts();
      alert("회원이 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
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
      VVIP: { class: "purple" },
      VIP: { class: "gold" },
      Gold: { class: "warning" },
      Silver: { class: "info" },
      Bronze: { class: "secondary" }
    };
    const config = gradeMap[grade] || { class: "secondary" };
    return <span className={`badge grade-badge ${config.class}`}>{grade}</span>;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ search: "", status: "", grade: "" });
    setCurrentPage(1);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>👥 회원 관리</h1>
          <p className="page-description">사업자 회원과 일반 회원을 구분하여 관리합니다</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="tab-menu">
        <button 
          className={`tab-item ${activeTab === "all" ? "active" : ""}`}
          onClick={() => handleTabChange("all")}
        >
          전체 회원
          <span className="tab-count">{counts.all}</span>
        </button>
        <button 
          className={`tab-item ${activeTab === "regular" ? "active" : ""}`}
          onClick={() => handleTabChange("regular")}
        >
          👤 일반 회원
          <span className="tab-count">{counts.regular}</span>
        </button>
        <button 
          className={`tab-item ${activeTab === "business" ? "active" : ""}`}
          onClick={() => handleTabChange("business")}
        >
          🏢 사업자 회원
          <span className="tab-count">{counts.business}</span>
        </button>
      </div>

      {/* 필터 영역 */}
      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>검색</label>
            <input
              type="text"
              placeholder="이름 또는 이메일로 검색..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          
          <div className="filter-item">
            <label>상태</label>
            <select 
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">전체 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="suspended">정지</option>
            </select>
          </div>

          <div className="filter-item">
            <label>등급</label>
            <select
              value={filters.grade}
              onChange={(e) => handleFilterChange("grade", e.target.value)}
            >
              <option value="">전체 등급</option>
              <option value="VVIP">VVIP</option>
              <option value="VIP">VIP</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>

          <div className="filter-item filter-actions">
            <button className="btn btn-outline" onClick={clearFilters}>
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* 회원 목록 */}
      {loading ? (
        <Loader />
      ) : users.length > 0 ? (
        <>
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
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
                    <td>
                      <div className="user-info-cell">
                        <div className="user-avatar">
                          <img 
                            src={user.avatar || "/placeholder-avatar.png"} 
                            alt={user.name}
                            onError={(e) => e.target.src = "/placeholder-avatar.png"}
                          />
                        </div>
                        <div className="user-details">
                          <div 
                            className="user-name clickable"
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                          >
                            {user.name}
                          </div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`type-badge ${user.type}`}>
                        {user.type === "business" ? "🏢 사업자" : "👤 일반"}
                      </span>
                    </td>
                    <td>{getGradeBadge(user.grade)}</td>
                    <td className="text-center">{user.totalBookings}회</td>
                    <td className="amount">₩{user.totalSpent.toLocaleString()}</td>
                    <td>{formatDate(user.joinDate)}</td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          title="상세보기"
                        >
                          👁️
                        </button>
                        
                        {user.status === "active" && (
                          <button 
                            className="btn btn-warning btn-sm"
                            onClick={() => handleStatusChange(user.id, user.name, "suspended")}
                            title="정지"
                          >
                            🚫
                          </button>
                        )}
                        
                        {user.status === "suspended" && (
                          <button 
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusChange(user.id, user.name, "active")}
                            title="정지 해제"
                          >
                            ✅
                          </button>
                        )}
                        
                        {user.status === "inactive" && (
                          <button 
                            className="btn btn-info btn-sm"
                            onClick={() => handleStatusChange(user.id, user.name, "active")}
                            title="활성화"
                          >
                            🔄
                          </button>
                        )}
                        
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(user.id, user.name)}
                          title="삭제"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <p>
            {activeTab === "business" 
              ? "사업자 회원이 없습니다." 
              : activeTab === "regular"
                ? "일반 회원이 없습니다."
                : "조건에 맞는 회원이 없습니다."}
          </p>
          <button className="btn btn-outline" onClick={clearFilters}>
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUserListPage;
