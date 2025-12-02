import { useAdminAuth } from "../../hooks/useAdminAuth";
import AdminProfileForm from "../../components/admin/settings/AdminProfileForm";

const BusinessMyProfilePage = () => {
  const { adminInfo } = useAdminAuth();

  const handleSubmit = async (formData) => {
    // TODO: 백엔드 연결 시 사업자 정보 수정 API 호출 (예: axios.put('/api/business/me', formData))
    console.log("수정할 정보:", formData);
    alert("정보가 수정되었습니다.");
  };

  return (
    <div className="business-profile-page">
      <div className="page-header">
        <h1>👤 내 정보 관리</h1>
      </div>
      
      {/* 기존 폼 컴포넌트 재사용 */}
      <AdminProfileForm profile={adminInfo} onSubmit={handleSubmit} />
    </div>
  );
};

export default BusinessMyProfilePage;