import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BusinessSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "", password: "", passwordConfirm: "",
    name: "", phone: "", businessNumber: "", hotelName: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) return alert("비밀번호가 일치하지 않습니다.");
    
    // TODO: API 연동 (회원가입 요청)
    console.log("Signup Data:", formData);
    alert("파트너 가입 신청이 완료되었습니다. 승인 후 이용 가능합니다.");
    navigate("/business/login");
  };

  return (
    <div className="login-page" style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}>
      <div className="login-container" style={{maxWidth: '500px'}}>
        <h2>파트너 입점 신청</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이메일 (아이디)</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input type="password" name="passwordConfirm" onChange={handleChange} required />
          </div>
          <hr style={{margin:'20px 0', border:'0', borderTop:'1px solid #e2e8f0'}}/>
          <div className="form-group">
            <label>대표자명</label>
            <input type="text" name="name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>호텔명 (상호)</label>
            <input type="text" name="hotelName" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>사업자 등록번호</label>
            <input type="text" name="businessNumber" placeholder="000-00-00000" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>연락처</label>
            <input type="text" name="phone" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary" style={{width:'100%', marginTop:'10px'}}>가입 신청하기</button>
        </form>
        <div style={{textAlign:'center', marginTop:'15px'}}>
            <Link to="/business/login" style={{color:'#3b82f6', fontSize:'0.9rem', textDecoration:'none'}}>이미 계정이 있으신가요? 로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignupPage;