import { useState, useEffect } from "react";
import { mockStatsApi } from "../../api/mockApi";
import { useNavigate } from "react-router-dom";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";

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

  if (loading) return <div className="loading">대시보드 로딩 중...</div>;

  // 통계 카드 데이터 정의 (기존 스타일 컬러 적용)
  const statsCards = [
    {
      title: "운영중인 호텔",
      value: `${dashboardData.activeHotels}개`,
      change: `+${dashboardData.monthlyGrowth.hotels}%`,
      positive: true,
      icon: "🏨",
      color: "#f59e0b" // 노랑
    },
    {
      title: "총 매출",
      value: `₩${dashboardData.totalRevenue.toLocaleString()}`,
      change: `+${dashboardData.monthlyGrowth.revenue}%`,
      positive: true,
      icon: "💰",
      color: "#10b981" // 초록
    },
    {
      title: "오늘 예약",
      value: `${dashboardData.todayBookings}건`,
      change: `+${dashboardData.monthlyGrowth.bookings}%`,
      positive: true,
      icon: "📅",
      color: "#2563eb" // 파랑
    },
    {
      title: "신규 회원",
      value: `${dashboardData.newUsers}명`,
      change: `+${dashboardData.monthlyGrowth.users}%`,
      positive: true,
      icon: "👥",
      color: "#06b6d4" // 하늘
    }
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="page-header">
        <h1>📊 관리자 대시보드</h1>
      </div>

      {/* 통계 카드 (기존 스타일) */}
      <div className="stats-grid">
        {statsCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-title">{card.title}</div>
              <div 
                className="stat-icon" 
                style={{ backgroundColor: `${card.color}20`, color: card.color }}
              >
                {card.icon}
              </div>
            </div>
            <div className="stat-value">{card.value}</div>
            <div className={`stat-change ${card.positive ? "positive" : "negative"}`}>
              {card.change} 전일 대비
            </div>
          </div>
        ))}
      </div>

      {/* 매출 차트 */}
      <div className="card" style={{marginBottom:'30px'}}>
        <h3 style={{marginBottom:'20px', borderLeft:'4px solid #3b82f6', paddingLeft:'10px'}}>📈 매출 분석</h3>
        <AdminChartArea data={dashboardData.chartData} />
      </div>

      {/* 최근 활동 (더보기 버튼 없음) */}
      <div className="dashboard-sections" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <div style={{marginBottom:'15px', paddingBottom:'10px', borderBottom:'1px solid #eee'}}>
            <h3>📋 최근 예약</h3>
          </div>
          <div className="recent-list">
            {dashboardData.recentBookings.map(booking => (
              <div key={booking.id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                <div>
                  <div style={{fontWeight:'600', color:'#334155'}}>{booking.guestName}</div>
                  <div style={{fontSize:'12px', color:'#64748b'}}>{booking.hotelName}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <span className={`badge badge-${booking.status === 'confirmed' ? 'success' : 'warning'}`}>
                    {booking.status === 'confirmed' ? '확정' : '대기'}
                  </span>
                  <div style={{ fontSize: '12px', marginTop: '4px', fontWeight:'bold', color:'#64748b' }}>₩{booking.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{marginBottom:'15px', paddingBottom:'10px', borderBottom:'1px solid #eee'}}>
            <h3>👥 신규 회원</h3>
          </div>
          <div className="recent-list">
            {dashboardData.recentUsers.map(user => (
              <div key={user.id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center'}}>👤</div>
                  <div>
                    <div style={{ fontWeight: '600', color:'#334155' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{user.email}</div>
                  </div>
                </div>
                <div style={{ fontSize:'12px', color:'#94a3b8' }}>{user.joinDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;