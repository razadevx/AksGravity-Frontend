import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
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

// Pages
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

const MasterData = () => <h1 className="text-4xl font-bold">Master Data</h1>;
const Workers = () => <h1 className="text-4xl font-bold">Workers Management</h1>;
const CashRegister = () => <h1 className="text-4xl font-bold">Daily Cash Register</h1>;
const BankCheques = () => <h1 className="text-4xl font-bold">Bank & Cheques</h1>;
const Composition = () => <h1 className="text-4xl font-bold">Composition Manager</h1>;
const Production = () => <h1 className="text-4xl font-bold">Production</h1>;
const Reports = () => <h1 className="text-4xl font-bold">Reports</h1>;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/master-data"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <MasterData />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/workers"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Workers />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/cash-register"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CashRegister />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/bank-cheques"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <BankCheques />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/composition"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Composition />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/production"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Production />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
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
