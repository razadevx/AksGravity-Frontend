import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector } from 'react-redux';
import './i18n/i18n';
import './index.css';

// Layout Components
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Main Layout Component
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

// Home Page Component
const Home = () => (
  <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to AKS DigiRec</h1>
      <p className="text-xl mb-8">Smart Business Solutions for Your Ceramics Factory</p>
      <a href="/dashboard" className="btn-primary inline-block">
        Go to Dashboard
      </a>
    </div>
  </div>
);

// Placeholder Pages for Navigation
const MasterData = () => (
  <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
    <h1 className="text-4xl font-bold">Master Data</h1>
  </div>
);

const Workers = () => (
  <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
    <h1 className="text-4xl font-bold">Workers Management</h1>
  </div>
);

const CashRegister = () => (
  <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
    <h1 className="text-4xl font-bold">Daily Cash Register</h1>
  </div>
);

const BankCheques = () => (
  <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
    <h1 className="text-4xl font-bold">Bank & Cheques</h1>
  </div>
);

const Composition = () => (
  <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
    <h1 className="text-4xl font-bold">Composition Manager</h1>
  </div>
);

const Production = () => (
  <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
    <h1 className="text-4xl font-bold">Production</h1>
  </div>
);

const Reports = () => (
  <div className="min-h-screen gradient-bg flex items-center justify-center text-white">
    <h1 className="text-4xl font-bold">Reports</h1>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          \u003cRoute path="/login" element={<Login />} />
          \u003cRoute path="/register" element={<Register />} />
          \u003cRoute path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes with Layout */}
          <route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <route
            path="/master-data"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <MasterData />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <route
            path="/workers"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Workers />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <route
            path="/cash-register"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CashRegister />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <route
            path="/bank-cheques"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <BankCheques />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <route
            path="/composition"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Composition />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <route
            path="/production"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Production />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <route
            path="/reports"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Reports />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
