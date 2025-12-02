import { useState, useEffect } from "react";

const AdminCouponForm = ({ coupon, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "fixed",
    discount: 0,
    minOrderAmount: 0,
    targetGrade: "all", // ★ 회원 등급 타겟팅
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        name: coupon.name || "",
        code: coupon.code || "",
        type: coupon.type || "fixed",
        discount: coupon.discount || 0,
        minOrderAmount: coupon.minOrderAmount || 0,
        targetGrade: coupon.targetGrade || "all",
        startDate: coupon.startDate || "",
        endDate: coupon.endDate || "",
        description: coupon.description || "",
      });
    }
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="card">
      <div className="form-group">
        <label>쿠폰명</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="예: 신규 가입 환영 쿠폰" />
      </div>

      <div className="form-group">
        <label>쿠폰 코드</label>
        <input type="text" name="code" value={formData.code} onChange={handleChange} required placeholder="예: WELCOME2024" />
      </div>

      <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>할인 유형</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="fixed">정액 할인 (원)</option>
            <option value="percent">정률 할인 (%)</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label>할인 값</label>
          <input type="number" name="discount" value={formData.discount} onChange={handleChange} required />
        </div>
      </div>

      {/* ★ 회원 등급 선택 기능 ★ */}
      <div className="form-group">
        <label>발급 대상 회원 등급</label>
        <select 
          name="targetGrade" 
          value={formData.targetGrade} 
          onChange={handleChange} 
          style={{border:'2px solid #3b82f6', background:'#eff6ff'}}
        >
          <option value="all">전체 회원</option>
          <option value="VVIP">VVIP 등급 이상</option>
          <option value="VIP">VIP 등급 이상</option>
          <option value="Gold">Gold 등급 이상</option>
          <option value="Silver">Silver 등급 이상</option>
          <option value="New">신규 회원 전용</option>
        </select>
        <p style={{fontSize:'0.85rem', color:'#64748b', marginTop:'6px'}}>
          * 선택한 등급 조건에 해당하는 회원에게만 쿠폰이 발급/노출됩니다.
        </p>
      </div>

      <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>시작일</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div style={{ flex: 1 }}>
          <label>종료일</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-group">
        <label>설명</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
      </div>

      <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button type="button" onClick={onCancel} className="btn btn-outline">취소</button>
        <button type="submit" className="btn btn-primary">{coupon ? "쿠폰 수정" : "쿠폰 생성"}</button>
      </div>
    </form>
  );
};

export default AdminCouponForm;