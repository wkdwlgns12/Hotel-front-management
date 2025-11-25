import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockUserApi } from "../../api/mockApi";
import Loader from "../../components/common/Loader";

const AdminUserDetailPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await mockUserApi.getUserById(userId);
      setUser(data);
    } catch (error) {
      console.error("회원 정보 로드 실패:", error);
      alert("회원 정보를 불러올 수 없습니다.");
      navigate("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    const statusLabels = {
      active: "활성화",
      suspended: "정지",
      inactive: "비활성화"
    };
    
    if (!confirm(`이 회원을 ${statusLabels[newStatus]}하시겠습니까?`)) return;
    
    try {
      await mockUserApi.updateUserStatus(userId, newStatus);
      loadUser();
      alert(`회원이 ${statusLabels[newStatus]}되었습니다.`);
    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!confirm(`"${user.name}" 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) return;
    
    try {
      await mockUserApi.deleteUser(userId);
      alert("회원이 삭제되었습니다.");
      navigate("/admin/users");
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
    return <span className={`badge ${config.class} badge-lg`}>{config.label}</span>;
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
    return <span className={`badge grade-badge ${config.class} badge-lg`}>{grade}</span>;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString('ko-KR');
  };

  if (loading) return <Loader fullScreen />;
  if (!user) return null;

  return (
    <div className="admin-detail-page">
      <div className="page-header">
        <div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate("/admin/users")}>
            ← 목록으로
          </button>
          <h1>{user.name}</h1>
          <p className="page-description">{user.email}</p>
        </div>
        <div className="header-actions">
          {user.status === "active" && (
            <button 
              className="btn btn-warning"
              onClick={() => handleStatusChange("suspended")}
            >
              🚫 정지
            </button>
          )}
          {user.status === "suspended" && (
            <button 
              className="btn btn-success"
              onClick={() => handleStatusChange("active")}
            >
              ✅ 정지 해제
            </button>
          )}
          {user.status === "inactive" && (
            <button 
              className="btn btn-info"
              onClick={() => handleStatusChange("active")}
            >
              🔄 활성화
            </button>
          )}
          <button 
            className="btn btn-danger"
            onClick={handleDelete}
          >
            🗑️ 삭제
          </button>
        </div>
      </div>

      <div className="detail-grid">
        {/* 기본 정보 */}
        <div className="detail-card">
          <h2>📋 기본 정보</h2>
          <div className="detail-content">
            <div className="detail-row">
              <span className="label">회원 유형</span>
              <span className="value">
                <span className={`type-badge ${user.type}`}>
                  {user.type === "business" ? "🏢 사업자 회원" : "👤 일반 회원"}
                </span>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">상태</span>
              <span className="value">{getStatusBadge(user.status)}</span>
            </div>
            <div className="detail-row">
              <span className="label">등급</span>
              <span className="value">{getGradeBadge(user.grade)}</span>
            </div>
            <div className="detail-row">
              <span className="label">이름</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">이메일</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">연락처</span>
              <span className="value">{user.phone}</span>
            </div>
            <div className="detail-row">
              <span className="label">성별</span>
              <span className="value">{user.gender === "male" ? "남성" : "여성"}</span>
            </div>
            <div className="detail-row">
              <span className="label">생년월일</span>
              <span className="value">{formatDate(user.birthDate)}</span>
            </div>
          </div>
        </div>

        {/* 활동 정보 */}
        <div className="detail-card">
          <h2>📊 활동 정보</h2>
          <div className="detail-content">
            <div className="detail-row">
              <span className="label">가입일</span>
              <span className="value">{formatDate(user.joinDate)}</span>
            </div>
            <div className="detail-row">
              <span className="label">최근 로그인</span>
              <span className="value">{formatDateTime(user.lastLogin)}</span>
            </div>
            <div className="detail-row">
              <span className="label">총 예약 횟수</span>
              <span className="value">{user.totalBookings}회</span>
            </div>
            <div className="detail-row">
              <span className="label">총 결제 금액</span>
              <span className="value amount">₩{user.totalSpent.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 사업자 정보 (사업자 회원인 경우만 표시) */}
        {user.type === "business" && user.businessInfo && (
          <div className="detail-card full-width">
            <h2>🏢 사업자 정보</h2>
            <div className="detail-content">
              <div className="detail-row">
                <span className="label">회사명</span>
                <span className="value">{user.businessInfo.companyName}</span>
              </div>
              <div className="detail-row">
                <span className="label">사업자등록번호</span>
                <span className="value">{user.businessInfo.businessNumber}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
