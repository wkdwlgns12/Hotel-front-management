import { useState } from "react";

const AdminSystemConfigForm = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState({
    siteName: config.siteName || "",
    siteEmail: config.siteEmail || "",
    maintenanceMode: config.maintenanceMode || false,
    bookingEnabled: config.bookingEnabled ?? true,
    reviewEnabled: config.reviewEnabled ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="card">
      <h3>기본 설정</h3>
      <div className="form-group">
        <label>사이트 이름</label>
        <input
          type="text"
          name="siteName"
          value={formData.siteName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>관리자 이메일</label>
        <input
          type="email"
          name="siteEmail"
          value={formData.siteEmail}
          onChange={handleChange}
        />
      </div>

      <h3>기능 제어</h3>
      <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="bookingEnabled"
            checked={formData.bookingEnabled}
            onChange={handleChange}
          />
          예약 시스템 활성화
        </label>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="reviewEnabled"
            checked={formData.reviewEnabled}
            onChange={handleChange}
          />
          리뷰 시스템 활성화
        </label>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ef4444' }}>
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={formData.maintenanceMode}
            onChange={handleChange}
          />
          유지보수 모드 (사이트 접속 차단)
        </label>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button type="submit" className="btn btn-primary">설정 저장</button>
      </div>
    </form>
  );
};

export default AdminSystemConfigForm;