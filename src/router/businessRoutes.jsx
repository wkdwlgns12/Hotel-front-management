import { Navigate } from "react-router-dom";
import BusinessLayout from "../components/layout/BusinessLayout";
import BusinessLoginPage from "../pages/auth/BusinessLoginPage";
import BusinessSignupPage from "../pages/auth/BusinessSignupPage";
import BusinessDashboardPage from "../pages/business/BusinessDashboardPage";
import BusinessMyHotelPage from "../pages/business/BusinessMyHotelPage";
import BusinessBookingPage from "../pages/business/BusinessBookingPage";
import BusinessReviewPage from "../pages/business/BusinessReviewPage";
import BusinessCouponPage from "../pages/business/BusinessCouponPage";
// ★ 새로 만든 페이지 import
import BusinessSettingsPage from "../pages/business/BusinessSettingsPage";
import BusinessMyProfilePage from "../pages/business/BusinessMyProfilePage";

const businessRoutes = [
  { path: "/business/login", element: <BusinessLoginPage /> },
  { path: "/business/signup", element: <BusinessSignupPage /> },
  {
    path: "/business",
    element: <BusinessLayout />,
    children: [
      { index: true, element: <Navigate to="/business/dashboard" replace /> },
      { path: "dashboard", element: <BusinessDashboardPage /> },
      { path: "my-hotel", element: <BusinessMyHotelPage /> },
      { path: "bookings", element: <BusinessBookingPage /> },
      { path: "reviews", element: <BusinessReviewPage /> },
      { path: "coupons", element: <BusinessCouponPage /> },
      // ★ 라우트 연결 ★
      { path: "settings", element: <BusinessSettingsPage /> },
      { path: "me", element: <BusinessMyProfilePage /> },
    ],
  },
];

export default businessRoutes;