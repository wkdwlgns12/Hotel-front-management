const AdminChartArea = ({ data }) => {
  // 실제 차트 라이브러리(Chart.js 등)를 사용하지 않고 CSS로 간단한 막대 그래프 효과 구현
  const maxRevenue = data ? Math.max(...data.revenue) : 100;

  return (
    <div className="chart-section">
      <div style={{width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '10px'}}>
        {data?.labels.map((label, idx) => {
          const heightPercentage = (data.revenue[idx] / maxRevenue) * 100;
          return (
            <div key={idx} style={{display:'flex', flexDirection:'column', alignItems:'center', flex:1, height:'100%'}}>
              <div style={{
                width: '100%', 
                height: `${heightPercentage}%`, 
                background: '#3b82f6', 
                borderRadius: '4px 4px 0 0',
                opacity: 0.8,
                marginTop: 'auto',
                transition: 'height 0.5s ease'
              }}></div>
              <div style={{marginTop:'10px', fontSize:'12px', color:'#64748b'}}>{label}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default AdminChartArea;