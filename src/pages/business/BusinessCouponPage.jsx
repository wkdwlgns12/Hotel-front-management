import AdminCouponListPage from "../admin/AdminCouponListPage"; 

const BusinessCouponPage = () => {
  // readOnly=true 를 전달하여 수정/삭제/생성 버튼을 숨김
  return <AdminCouponListPage readOnly={true} />;
};

export default BusinessCouponPage;