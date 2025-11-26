import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import adminRoutes from "./router/adminRoutes";
import "./styles/index.scss";


const AppRoutes = () => {
  const element = useRoutes([
    { path: "/", element: <Navigate to="/admin/login" replace /> }, 
    ...adminRoutes, 
  ]);
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AppRoutes />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;