import { useState } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const AdminMyProfilePage = () => {
  const { adminInfo } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: adminInfo?.name || "김관리자",
    email: adminInfo?.email || "admin@hotel.com",
    phone: adminInfo?.phone || "010-1234-5678",
    department: adminInfo?.department || "시스템관리팀"
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = (key, value) => {
    setPasswords(prev => ({ ...prev, [key]: value }));
  };

  const handleProfileSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert("프로필이 저장되었습니다.");
  };

  const handlePasswordSave = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (passwords.newPassword.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    alert("비밀번호가 변경되었습니다.");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString('ko-KR');
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>👤 내 정보</h1>
          <p className="page-description">관리자 계정 정보를 관리합니다</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="tab-menu">
        <button 
          className={`tab-item ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          📋 프로필
        </button>
        <button 
          className={`tab-item ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          🔒 비밀번호 변경
        </button>
        <button 
          className={`tab-item ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          📊 활동 내역
        </button>
      </div>

      {/* 프로필 탭 */}
      {activeTab === "profile" && (
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-placeholder">👤</div>
              </div>
              <div className="profile-info">
                <h2>{profile.name}</h2>
                <p>{adminInfo?.role === "super_admin" ? "슈퍼 관리자" : "관리자"}</p>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <h2>📋 기본 정보</h2>
            <div className="settings-form">
              <div className="form-group">
                <label>이름</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>연락처</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>부서</label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => handleProfileChange("department", e.target.value)}
                />
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleProfileSave} disabled={saving}>
                  {saving ? "저장 중..." : "💾 저장"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 탭 */}
      {activeTab === "password" && (
        <div className="settings-card">
          <h2>🔒 비밀번호 변경</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>현재 비밀번호</label>
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                placeholder="현재 비밀번호 입력"
              />
            </div>
            <div className="form-group">
              <label>새 비밀번호</label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                placeholder="새 비밀번호 입력 (8자 이상)"
              />
            </div>
            <div className="form-group">
              <label>새 비밀번호 확인</label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                placeholder="새 비밀번호 다시 입력"
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handlePasswordSave} disabled={saving}>
                {saving ? "변경 중..." : "🔒 비밀번호 변경"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 활동 내역 탭 */}
      {activeTab === "activity" && (
        <div className="settings-card">
          <h2>📊 활동 내역</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">🔐</div>
              <div className="activity-content">
                <div className="activity-title">로그인</div>
                <div className="activity-time">{formatDate(adminInfo?.lastLogin)}</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📅</div>
              <div className="activity-content">
                <div className="activity-title">계정 생성일</div>
                <div className="activity-time">{formatDate(adminInfo?.createdAt)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMyProfilePage;
