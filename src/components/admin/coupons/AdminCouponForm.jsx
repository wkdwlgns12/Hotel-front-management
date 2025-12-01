import { useState, useEffect } from "react";

const AdminCouponForm = ({ coupon, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "fixed",
    discount: 0,
    minOrderAmount: 0, // 사용 가능한 최소 금액
    quantity: 100,     // ★ 쿠폰 수량 (새로 추가)
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        ...coupon,
        quantity: coupon.quantity || coupon.usageLimit || 100, // 기존 데이터 호환
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
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="예: 여름 휴가 1만원 할인" />
      </div>

      <div className="form-group">
        <label>쿠폰 코드</label>
        <input type="text" name="code" value={formData.code} onChange={handleChange} required placeholder="예: SUMMER2024" />
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

      {/* ★ 수정된 부분: 수량 및 최소 주문 금액 ★ */}
      <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>발급 수량 (총 개수)</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required placeholder="예: 100" />
        </div>
        <div style={{ flex: 1 }}>
          <label>최소 주문 금액 (사용 조건)</label>
          <input type="number" name="minOrderAmount" value={formData.minOrderAmount} onChange={handleChange} placeholder="0원 이상일 때 사용 가능" />
          <p style={{fontSize:'0.8rem', color:'#64748b', marginTop:'4px'}}>* 입력한 금액 이상 결제 시에만 쿠폰 사용이 가능합니다.</p>
        </div>
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
        <button type="submit" className="btn btn-primary">{coupon ? "수정 저장" : "쿠폰 생성"}</button>
      </div>
    </form>
  );
};

export default AdminCouponForm;