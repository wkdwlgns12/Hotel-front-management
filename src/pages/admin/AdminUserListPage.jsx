import { useState, useEffect } from "react";
import { adminUserApi } from "../../api/adminUserApi"; // ★ mockUserApi -> adminUserApi로 변경
import { useNavigate } from "react-router-dom";

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({ search: "", status: "", grade: "" });
  const navigate = useNavigate();

  useEffect(() => { loadUsers(); }, [filters, activeTab]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const typeFilter = activeTab === 'all' ? '' : activeTab;
      // 백엔드 API 호출
      const response = await adminUserApi.getUsers({ ...filters, type: typeFilter });
      // 백엔드 응답 구조에 따라 data.users 또는 data 로 수정 필요
      setUsers(response.users || response); 
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await adminUserApi.updateUserStatus(userId, newStatus);
      loadUsers(); // 상태 변경 후 목록 새로고침
    } catch (error) {
      alert("상태 변경에 실패했습니다.");
    }
  };
  
  // ... (getStatusBadge 등 UI 렌더링 코드는 기존 유지) ...

  return (
    <div className="admin-user-page">
      {/* ... (기존 UI 코드 동일) ... */}
        {/* 테이블 내부 상태 변경 버튼 부분 */}
        {user.status === "active" ? 
            <button className="btn btn-primary" style={{padding:'6px 12px', fontSize:'0.8rem'}} onClick={() => handleStatusChange(user.id, "inactive")}>비활성 처리</button> :
            <button className="btn btn-primary" style={{padding:'6px 12px', fontSize:'0.8rem'}} onClick={() => handleStatusChange(user.id, "active")}>활성 처리</button>
        }
      {/* ... */}
    </div>
  );
};

export default AdminUserListPage;