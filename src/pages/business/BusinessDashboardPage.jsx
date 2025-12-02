import { useState, useEffect } from "react";
import { mockStatsApi } from "../../api/mockApi";
import AdminChartArea from "../../components/admin/dashboard/AdminChartArea";

const BusinessDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제로는 내 호텔 ID로 필터링된 데이터를 가져와야 함
    mockStatsApi.getDashboardStats().then((res) => {
      setData({ ...res, totalRevenue: 8500000, todayBookings: 4 }); // Mock 데이터 조정
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;

  const statsCards = [
    { title: "오늘 예약", value: `${data.todayBookings}건`, change: "+2", positive: true, icon: "📅", color: "#2563eb" },
    { title: "이번 달 매출", value: `₩${data.totalRevenue.toLocaleString()}`, change: "+12%", positive: true, icon: "💰", color: "#10b981" },
    { title: "평점", value: "4.8", change: "0.0", positive: true, icon: "⭐", color: "#f59e0b" },
    { title: "리뷰 수", value: "128개", change: "+5", positive: true, icon: "📝", color: "#06b6d4" },
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="page-header">
        <h1>📊 파트너 대시보드</h1>
        <p style={{color:'#64748b'}}>내 호텔: 서울 그랜드 호텔</p>
      </div>
      
      <div className="stats-grid">
        {statsCards.map((card, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-header">
                <span className="stat-title">{card.title}</span>
                <div className="stat-icon" style={{backgroundColor:`${card.color}20`, color:card.color}}>{card.icon}</div>
            </div>
            <div className="stat-value">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{marginBottom:'20px', borderLeft:'4px solid #3b82f6', paddingLeft:'10px'}}>📈 내 호텔 매출 분석</h3>
        <AdminChartArea data={data.chartData} />
      </div>
    </div>
  );
};

export default BusinessDashboardPage;