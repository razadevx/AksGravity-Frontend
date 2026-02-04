import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Core
import Dashboard from "./pages/Dashboard";

// Workers Module
import WorkersLayout from "./pages/workers/WorkersLayout";
import WorkerDashboard from "./pages/workers/WorkerDashboard";
import Attendance from "./pages/workers/Attendance";
import WorkersAdmin from "./pages/admin/WorkersAdmin";
import WorkerCategoriesAdmin from "./pages/admin/WorkerCategoriesAdmin";
import MonthlyWorkerSummary from "./pages/workers/MonthlyWorkerSummary";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ===== DASHBOARD ===== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ===== WORKERS MODULE ===== */}
      <Route
        path="/workers"
        element={
          <ProtectedRoute>
            <WorkersLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<WorkerDashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="list" element={<WorkersAdmin />} />
        <Route path="categories" element={<WorkerCategoriesAdmin />} />
        <Route path="summary" element={<MonthlyWorkerSummary />} />
      </Route>

      {/* ===== FALLBACK ===== */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}
