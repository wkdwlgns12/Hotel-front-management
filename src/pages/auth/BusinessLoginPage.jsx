import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BusinessLoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/business/dashboard");
  };

  return (
    <div className="login-page" style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}>
        <div className="login-container">
            <h2>파트너 센터 로그인</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group"><label>이메일</label><input type="email" required /></div>
                <div className="form-group"><label>비밀번호</label><input type="password" required /></div>
                <button className="btn btn-primary" style={{width:'100%'}}>로그인</button>
            </form>
            <div style={{marginTop:'20px', textAlign:'center'}}>
                <Link to="/business/signup" style={{color:'#3b82f6', textDecoration:'none', fontWeight:'600'}}>
                    아직 파트너가 아니신가요? 입점 신청하기 &rarr;
                </Link>
            </div>
        </div>
    </div>
  );
};
export default BusinessLoginPage;