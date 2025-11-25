import { useState } from "react";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    general: {
      siteName: "호텔 예약 시스템",
      siteDescription: "최고의 호텔 예약 서비스",
      contactEmail: "support@hotelbook.com",
      contactPhone: "1588-1234"
    },
    booking: {
      maxAdvanceBooking: 365,
      minAdvanceBooking: 1,
      cancellationPolicy: "체크인 24시간 전까지 무료 취소"
    },
    notification: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: false
    }
  });

  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const handleChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Mock API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert("설정이 저장되었습니다.");
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>⚙️ 설정</h1>
          <p className="page-description">시스템 설정을 관리합니다</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? "저장 중..." : "💾 설정 저장"}
        </button>
      </div>

      {/* 설정 탭 */}
      <div className="tab-menu">
        <button 
          className={`tab-item ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          🏢 일반 설정
        </button>
        <button 
          className={`tab-item ${activeTab === "booking" ? "active" : ""}`}
          onClick={() => setActiveTab("booking")}
        >
          📅 예약 설정
        </button>
        <button 
          className={`tab-item ${activeTab === "notification" ? "active" : ""}`}
          onClick={() => setActiveTab("notification")}
        >
          🔔 알림 설정
        </button>
      </div>

      {/* 일반 설정 */}
      {activeTab === "general" && (
        <div className="settings-card">
          <h2>🏢 일반 설정</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>사이트 이름</label>
              <input
                type="text"
                value={settings.general.siteName}
                onChange={(e) => handleChange("general", "siteName", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>사이트 설명</label>
              <textarea
                value={settings.general.siteDescription}
                onChange={(e) => handleChange("general", "siteDescription", e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>고객센터 이메일</label>
              <input
                type="email"
                value={settings.general.contactEmail}
                onChange={(e) => handleChange("general", "contactEmail", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>고객센터 전화번호</label>
              <input
                type="text"
                value={settings.general.contactPhone}
                onChange={(e) => handleChange("general", "contactPhone", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* 예약 설정 */}
      {activeTab === "booking" && (
        <div className="settings-card">
          <h2>📅 예약 설정</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>최대 예약 가능 일수 (일)</label>
              <input
                type="number"
                value={settings.booking.maxAdvanceBooking}
                onChange={(e) => handleChange("booking", "maxAdvanceBooking", parseInt(e.target.value))}
              />
              <p className="form-help">오늘로부터 최대 몇 일 후까지 예약 가능한지 설정합니다.</p>
            </div>
            <div className="form-group">
              <label>최소 예약 가능 일수 (일)</label>
              <input
                type="number"
                value={settings.booking.minAdvanceBooking}
                onChange={(e) => handleChange("booking", "minAdvanceBooking", parseInt(e.target.value))}
              />
              <p className="form-help">최소 며칠 전에 예약해야 하는지 설정합니다.</p>
            </div>
            <div className="form-group">
              <label>취소 정책</label>
              <textarea
                value={settings.booking.cancellationPolicy}
                onChange={(e) => handleChange("booking", "cancellationPolicy", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* 알림 설정 */}
      {activeTab === "notification" && (
        <div className="settings-card">
          <h2>🔔 알림 설정</h2>
          <div className="settings-form">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.notification.emailNotifications}
                  onChange={(e) => handleChange("notification", "emailNotifications", e.target.checked)}
                />
                <span>📧 이메일 알림</span>
              </label>
              <p className="form-help">예약, 취소 등 주요 이벤트를 이메일로 알려드립니다.</p>
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.notification.smsNotifications}
                  onChange={(e) => handleChange("notification", "smsNotifications", e.target.checked)}
                />
                <span>📱 SMS 알림</span>
              </label>
              <p className="form-help">중요한 알림을 SMS로 발송합니다.</p>
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.notification.pushNotifications}
                  onChange={(e) => handleChange("notification", "pushNotifications", e.target.checked)}
                />
                <span>🔔 푸시 알림</span>
              </label>
              <p className="form-help">브라우저 푸시 알림을 활성화합니다.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
