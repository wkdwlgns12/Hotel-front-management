import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockStatsApi, mockHotelApi, mockUserApi, mockReviewApi } from "../../api/mockApi";
import Loader from "../../components/common/Loader";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [recentHotels, setRecentHotels] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, hotelsData, usersData, reviewsData] = await Promise.all([
        mockStatsApi.getDashboardStats(),
        mockHotelApi.getHotels({}),
        mockUserApi.getUsers({}),
        mockReviewApi.getReviews({})
      ]);
      
      setDashboardData(statsData);
      setRecentHotels(hotelsData.hotels.slice(0, 5));
      setRecentUsers(usersData.users.slice(0, 5));
      setRecentReviews(reviewsData.reviews.slice(0, 5));
    } catch (error) {
      console.error("대시보드 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status, type) => {
    const statusConfig = {
      hotel: {
        approved: { label: "승인", class: "success" },
        pending: { label: "대기", class: "warning" },
        rejected: { label: "거부", class: "danger" }
      },
      user: {
        active: { label: "활성", class: "success" },
        inactive: { label: "비활성", class: "secondary" },
        suspended: { label: "정지", class: "danger" }
      }
    };
    const config = statusConfig[type]?.[status] || { label: status, class: "secondary" };
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="admin-dashboard-page">
      <div className="page-header">
        <div>
          <h1>📊 대시보드</h1>
          <p className="page-description">호텔 예약 시스템 운영 현황을 한눈에 확인하세요</p>
        </div>
        <button className="btn btn-primary" onClick={loadDashboardData}>
          🔄 새로고침
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate('/admin/hotels')}>
          <div className="stat-icon hotels">🏨</div>
          <div className="stat-content">
            <h3>활성 호텔</h3>
            <div className="stat-value">{dashboardData?.activeHotels || 0}개</div>
            <div className="stat-growth positive">
              +{dashboardData?.monthlyGrowth?.hotels || 0}% 전월 대비
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bookings">📅</div>
          <div className="stat-content">
            <h3>오늘 예약</h3>
            <div className="stat-value">{dashboardData?.todayBookings || 0}건</div>
            <div className="stat-growth positive">
              +{dashboardData?.monthlyGrowth?.bookings || 0}% 전월 대비
            </div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/users')}>
          <div className="stat-icon users">👥</div>
          <div className="stat-content">
            <h3>신규 회원</h3>
            <div className="stat-value">{dashboardData?.newUsers || 0}명</div>
            <div className="stat-growth positive">
              +{dashboardData?.monthlyGrowth?.users || 0}% 전월 대비
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-content">
            <h3>월 매출</h3>
            <div className="stat-value">₩{(dashboardData?.totalRevenue || 0).toLocaleString()}</div>
            <div className="stat-growth positive">
              +{dashboardData?.monthlyGrowth?.revenue || 0}% 전월 대비
            </div>
          </div>
        </div>
      </div>

      {/* 최근 활동 섹션 */}
      <div className="dashboard-sections">
        {/* 최근 등록 호텔 */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>🏨 최근 등록 호텔</h2>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin/hotels')}>
              전체 보기 →
            </button>
          </div>
          <div className="card-content">
            {recentHotels.length > 0 ? (
              <div className="recent-list">
                {recentHotels.map(hotel => (
                  <div 
                    key={hotel.id} 
                    className="recent-item clickable"
                    onClick={() => navigate(`/admin/hotels/${hotel.id}`)}
                  >
                    <div className="item-main">
                      <div className="item-title">{hotel.name}</div>
                      <div className="item-sub">📍 {hotel.region} · {hotel.category}</div>
                    </div>
                    <div className="item-meta">
                      {getStatusBadge(hotel.status, 'hotel')}
                      <span className="item-rating">⭐ {hotel.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-message">등록된 호텔이 없습니다.</div>
            )}
          </div>
        </div>

        {/* 최근 가입 회원 */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>👥 최근 가입 회원</h2>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin/users')}>
              전체 보기 →
            </button>
          </div>
          <div className="card-content">
            {recentUsers.length > 0 ? (
              <div className="recent-list">
                {recentUsers.map(user => (
                  <div 
                    key={user.id} 
                    className="recent-item clickable"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    <div className="item-main">
                      <div className="item-title">{user.name}</div>
                      <div className="item-sub">{user.email}</div>
                    </div>
                    <div className="item-meta">
                      <span className={`type-badge ${user.type}`}>
                        {user.type === "business" ? "사업자" : "일반"}
                      </span>
                      {getStatusBadge(user.status, 'user')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-message">가입한 회원이 없습니다.</div>
            )}
          </div>
        </div>

        {/* 최근 리뷰 */}
        <div className="dashboard-card full-width">
          <div className="card-header">
            <h2>⭐ 최근 리뷰</h2>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin/reviews')}>
              전체 보기 →
            </button>
          </div>
          <div className="card-content">
            {recentReviews.length > 0 ? (
              <div className="recent-list">
                {recentReviews.map(review => (
                  <div 
                    key={review.id} 
                    className="recent-item review-item clickable"
                    onClick={() => navigate(`/admin/reviews/${review.id}`)}
                  >
                    <div className="review-rating">
                      {"⭐".repeat(review.rating)}
                    </div>
                    <div className="item-main">
                      <div className="item-title">{review.hotelName}</div>
                      <div className="item-sub">{review.comment.substring(0, 50)}...</div>
                    </div>
                    <div className="item-meta">
                      <span className="reviewer">{review.guestName}</span>
                      {review.reported && <span className="badge danger">신고됨</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-message">등록된 리뷰가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
