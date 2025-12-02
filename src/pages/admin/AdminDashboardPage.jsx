import { useState, useEffect } from "react";
import { mockStatsApi } from "../../api/mockApi";
import { useNavigate } from "react-router-dom";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
    loadDashboardData();
  }, []);

  if (loading) return <div className="loading">대시보드 로딩 중...</div>;

  // 통계 카드 데이터 (오늘 예약 제거됨)
  const statsCards = [
    { title: "운영중인 호텔", value: `${dashboardData.activeHotels}개`, change: `+${dashboardData.monthlyGrowth.hotels}%`, positive: true, icon: "🏨", color: "#f59e0b" },
    { title: "이번 달 총 매출", value: `₩${dashboardData.totalRevenue.toLocaleString()}`, change: `+${dashboardData.monthlyGrowth.revenue}%`, positive: true, icon: "💰", color: "#10b981" },
    { title: "신규 회원", value: `${dashboardData.newUsers}명`, change: `+${dashboardData.monthlyGrowth.users}%`, positive: true, icon: "👥", color: "#06b6d4" }
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="page-header">
        <h1>📊 관리자 대시보드</h1>
      </div>

      {/* 통계 카드 (3열로 변경) */}
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
        {statsCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-title">{card.title}</div>
              <div className="stat-icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}>{card.icon}</div>
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
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
          <h3 style={{marginBottom:0, borderLeft:'4px solid #3b82f6', paddingLeft:'10px'}}>📈 월별 매출 분석 (단위: 원)</h3>
          <select style={{padding:'5px 10px', border:'1px solid #ddd', borderRadius:'4px'}}>
            <option>2024년</option>
            <option>2023년</option>
          </select>
        </div>
        <AdminChartArea data={dashboardData.chartData} />
      </div>

      {/* 최근 활동 (최근 예약 목록 제거) */}
      <div className="dashboard-sections">
        <div className="card">
          <div style={{marginBottom:'15px', paddingBottom:'10px', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>👥 최근 가입 회원</h3>
            <button className="btn btn-outline-sm" onClick={() => navigate('/admin/users')}>더보기</button>
          </div>
          <div className="recent-list">
            {dashboardData.recentUsers.map(user => (
              <div key={user.id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}><div style={{width:'32px', height:'32px', borderRadius:'50%', background:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center'}}>👤</div><div><div style={{ fontWeight: '600', color:'#334155' }}>{user.name}</div><div style={{ fontSize: '12px', color: '#94a3b8' }}>{user.email}</div></div></div>
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