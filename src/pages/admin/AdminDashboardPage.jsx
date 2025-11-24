import { useState, useEffect } from "react";
import { mockStatsApi } from "../../api/mockApi";
import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";
import AdminRecentTable from "../../components/admin/dashboard/AdminRecentTable";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await mockStatsApi.getDashboardStats();
      setDashboardData(data);
    } catch (error) {
      console.error("대시보드 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="loading">대시보드 로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <div className="page-header">
        <h1>📊 관리자 대시보드</h1>
        <p>호텔 예약 시스템 운영 현황</p>
      </div>

      {/* 통계 카드 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏨</div>
          <div className="stat-content">
            <h3>총 호텔</h3>
            <div className="stat-value">{dashboardData.activeHotels}개</div>
            <div className="stat-growth">+{dashboardData.monthlyGrowth.hotels}% 증가</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>오늘 예약</h3>
            <div className="stat-value">{dashboardData.todayBookings}건</div>
            <div className="stat-growth">+{dashboardData.monthlyGrowth.bookings}% 증가</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>신규 회원</h3>
            <div className="stat-value">{dashboardData.newUsers}명</div>
            <div className="stat-growth">+{dashboardData.monthlyGrowth.users}% 증가</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>월 매출</h3>
            <div className="stat-value">₩{dashboardData.totalRevenue.toLocaleString()}</div>
            <div className="stat-growth">+{dashboardData.monthlyGrowth.revenue}% 증가</div>
          </div>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="dashboard-sections">
        <div className="recent-section">
          <h2>📋 최근 예약</h2>
          <div className="recent-list">
            {dashboardData.recentBookings.map(booking => (
              <div key={booking.id} className="recent-item">
                <div className="item-info">
                  <span className="guest-name">{booking.guestName}</span>
                  <span className="hotel-name">{booking.hotelName}</span>
                </div>
                <div className="item-status">
                  <span className={`status ${booking.status}`}>{booking.status}</span>
                  <span className="amount">₩{booking.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-section">
          <h2>👥 신규 회원</h2>
          <div className="recent-list">
            {dashboardData.recentUsers.map(user => (
              <div key={user.id} className="recent-item">
                <div className="item-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <div className="item-status">
                  <span className={`status ${user.status}`}>{user.status}</span>
                  <span className="join-date">{user.joinDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;