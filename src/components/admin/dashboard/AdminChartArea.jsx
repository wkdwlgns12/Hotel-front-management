const AdminChartArea = ({ data }) => {
  return (
    <div className="card">
      <h3>매출 추이</h3>
      <div className="chart-placeholder">
        <p>차트 영역 (Chart.js 또는 Recharts 사용)</p>
        <p>데이터: {JSON.stringify(data)}</p>
      </div>
    </div>
  );
};

export default AdminChartArea;
