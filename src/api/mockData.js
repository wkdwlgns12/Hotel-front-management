// Mock 데이터 - 로그인 테스트용 최소 데이터
export const mockAdminUser = {
  id: 1,
  name: "관리자",
  email: "admin@hotel.com",
  role: "admin",
};

export const mockDashboardStats = {
  todayBookings: 15,
  totalRevenue: 12500000,
  activeHotels: 45,
  newUsers: 8,
  chartData: {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    revenue: [2000000, 2500000, 2200000, 2800000, 3000000, 3200000],
    bookings: [45, 58, 52, 67, 72, 78],
  },
  recentBookings: [],
  recentUsers: [],
  recentReviews: [],
};

// 누락된 Mock 데이터들 추가
export const mockBookings = [
  {
    id: 1,
    guestName: "김철수",
    hotelName: "서울호텔",
    checkIn: "2024-01-15",
    checkOut: "2024-01-17", 
    status: "confirmed",
    totalAmount: 250000
  },
  {
    id: 2,
    guestName: "이영희",
    hotelName: "부산리조트",
    checkIn: "2024-01-20",
    checkOut: "2024-01-22",
    status: "pending", 
    totalAmount: 180000
  }
];

export const mockHotels = [
  {
    id: 1,
    name: "서울호텔",
    address: "서울시 강남구",
    status: "approved",
    rating: 4.5,
    rooms: 120
  },
  {
    id: 2,
    name: "부산리조트", 
    address: "부산시 해운대구",
    status: "pending",
    rating: 4.2,
    rooms: 80
  }
];

export const mockUsers = [
  {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    status: "active",
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    name: "이영희",
    email: "lee@example.com", 
    status: "active",
    createdAt: "2024-01-10"
  }
];

export const mockReviews = [
  {
    id: 1,
    hotelName: "서울호텔",
    guestName: "김철수",
    rating: 5,
    comment: "정말 좋았습니다!",
    status: "approved"
  },
  {
    id: 2,
    hotelName: "부산리조트",
    guestName: "이영희", 
    rating: 4,
    comment: "깨끗하고 좋네요",
    status: "pending"
  }
];

export const mockCoupons = [
  {
    id: 1,
    name: "신규회원 할인",
    code: "NEW2024",
    discount: 10000,
    type: "fixed",
    status: "active"
  },
  {
    id: 2,
    name: "여름휴가 특가", 
    code: "SUMMER20",
    discount: 20,
    type: "percent",
    status: "active"
  }
];