import { useState, useEffect } from "react";

const AdminProfileForm = ({ profile, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      }));
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="card">
      <div className="detail-section">
        <div className="detail-row">
          <div className="label">이름</div>
          <div className="value">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              style={{width:'100%', padding:'8px', border:'1px solid #ddd', borderRadius:'4px'}}
            />
          </div>
        </div>
        <div className="detail-row">
          <div className="label">이메일</div>
          <div className="value">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              style={{ background: '#f1f5f9', width:'100%', padding:'8px', border:'1px solid #ddd', borderRadius:'4px' }}
            />
          </div>
        </div>
        <div className="detail-row">
          <div className="label">연락처</div>
          <div className="value">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{width:'100%', padding:'8px', border:'1px solid #ddd', borderRadius:'4px'}}
            />
          </div>
        </div>
        <div className="detail-row">
          <div className="label">새 비밀번호</div>
          <div className="value">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="변경할 경우에만 입력"
              style={{width:'100%', padding:'8px', border:'1px solid #ddd', borderRadius:'4px'}}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button type="submit" className="btn btn-primary">정보 수정</button>
      </div>
    </form>
  );
};

export default AdminProfileForm;