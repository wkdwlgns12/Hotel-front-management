import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHotelDetail from "../../components/admin/hotels/AdminHotelDetail";
import { adminHotelApi } from "../../api/adminHotelApi";
import Loader from "../../components/common/Loader";

const AdminHotelEditPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await adminHotelApi.getHotelById(hotelId);
        setHotel(data);
      } catch(e) { alert("정보 로드 실패"); } 
      finally { setLoading(false); }
    };
    fetch();
  }, [hotelId]);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-hotel-view-page">
      <div className="page-header">
        <h1>호텔 상세 정보</h1>
        <button onClick={() => navigate("/admin/hotels")} className="btn btn-outline">목록으로</button>
      </div>
      <AdminHotelDetail hotel={hotel} />
    </div>
  );
};

export default AdminHotelEditPage;