import { useState, useEffect } from "react";
import { mockStatsApi } from "../../api/mockApi";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    return <div className="loading">대시보드 로딩 중...</div>;
  }

  return (
    <div className="admin-dashboard-page">
      <div className="page-header">
        <h1>📊 관리자 대시보드</h1>
        <p>실시간 예약 및 회원 현황</p>
      </div>

      {/* 통계 카드 */}
      <div className="stats-grid">
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
      <div className="dashboard-sections" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="recent-section card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2>📋 최근 예약</h2>
            <button className="btn btn-outline-sm" onClick={() => navigate('/admin/bookings')}>더보기</button>
          </div>
          <div className="recent-list">
            {dashboardData.recentBookings.map(booking => (
              <div key={booking.id} className="recent-item" style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <div className="item-info">
                  <div style={{ fontWeight: 'bold' }}>{booking.guestName}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{booking.hotelName}</div>
                </div>
                <div className="item-status" style={{ textAlign: 'right' }}>
                  <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>{booking.status}</span>
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>₩{booking.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-section card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2>👥 신규 회원</h2>
            <button className="btn btn-outline-sm" onClick={() => navigate('/admin/users')}>더보기</button>
          </div>
          <div className="recent-list">
            {dashboardData.recentUsers.map(user => (
              <div key={user.id} className="recent-item" style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <div className="item-info">
                  <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
                </div>
                <div className="item-status" style={{ textAlign: 'right' }}>
                  <span className="badge badge-success">{user.status}</span>
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>{user.joinDate}</div>
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