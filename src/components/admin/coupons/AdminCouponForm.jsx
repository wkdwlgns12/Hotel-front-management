import { useState, useEffect } from "react";

const AdminCouponForm = ({ coupon, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "fixed", // fixed or percent
    discount: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    startDate: "",
    endDate: "",
    usageLimit: 100,
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
        maxDiscount: coupon.maxDiscount || 0,
        startDate: coupon.startDate || "",
        endDate: coupon.endDate || "",
        usageLimit: coupon.usageLimit || 100,
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
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="예: 여름 휴가 특가 쿠폰" />
      </div>

      <div className="form-group">
        <label>쿠폰 코드</label>
        <input type="text" name="code" value={formData.code} onChange={handleChange} required placeholder="예: SUMMER2024 (영문/숫자)" />
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

      <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>최소 주문 금액</label>
          <input type="number" name="minOrderAmount" value={formData.minOrderAmount} onChange={handleChange} />
        </div>
        {formData.type === 'percent' && (
          <div style={{ flex: 1 }}>
            <label>최대 할인 금액</label>
            <input type="number" name="maxDiscount" value={formData.maxDiscount} onChange={handleChange} />
          </div>
        )}
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
        <label>발급 제한 수량</label>
        <input type="number" name="usageLimit" value={formData.usageLimit} onChange={handleChange} />
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