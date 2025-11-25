import { Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminLoginPage from "../pages/auth/AdminLoginPage.jsx";
import AdminForgotPasswordPage from "../pages/auth/AdminForgotPasswordPage.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import AdminBookingListPage from "../pages/admin/AdminBookingListPage.jsx";
import AdminBookingDetailPage from "../pages/admin/AdminBookingDetailPage.jsx";
import AdminUserListPage from "../pages/admin/AdminUserListPage.jsx";
import AdminUserDetailPage from "../pages/admin/AdminUserDetailPage.jsx";
import AdminReviewListPage from "../pages/admin/AdminReviewListPage.jsx";
import AdminReviewDetailPage from "../pages/admin/AdminReviewDetailPage.jsx";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage.jsx";
import AdminMyProfilePage from "../pages/admin/AdminMyProfilePage.jsx";

const adminRoutes = [
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin/forgot-password",
    element: <AdminForgotPasswordPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "bookings",
        element: <AdminBookingListPage />,
      },
      {
        path: "bookings/:bookingId",
        element: <AdminBookingDetailPage />,
      },
      {
        path: "users",
        element: <AdminUserListPage />,
      },
      {
        path: "users/:userId",
        element: <AdminUserDetailPage />,
      },
      {
        path: "reviews",
        element: <AdminReviewListPage />,
      },
      {
        path: "reviews/:reviewId",
        element: <AdminReviewDetailPage />,
      },
      {
        path: "settings",
        element: <AdminSettingsPage />,
      },
      {
        path: "me",
        element: <AdminMyProfilePage />,
      },
    ],
  },
];

export default adminRoutes;