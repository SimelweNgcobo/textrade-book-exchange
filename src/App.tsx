import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import OAuthRedirectHandler from "./components/OAuthRedirectHandler";
import OAuthDebugInfo from "./components/OAuthDebugInfo";
import DatabaseDebugTest from "./components/DatabaseDebugTest";
import {
  addEmergencyResetButton,
  monitorLoadingStates,
} from "./utils/emergencyLoadingReset";

// Pages
import Index from "./pages/Index";
import BookListing from "./pages/BookListing";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import OAuthTest from "./pages/OAuthTest";
import CreateListing from "./pages/CreateListing";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import ContactUs from "./pages/ContactUs";
import ActivityLog from "./pages/ActivityLog";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdminReports from "./pages/AdminReports";
import Notifications from "./pages/Notifications";
import Confirm from "./pages/Confirm";
import Verify from "./pages/Verify";
import EditBook from "./pages/EditBook";
import Cart from "./pages/Cart";
import Report from "./pages/Report";
import Shipping from "./pages/Shipping";

import "./App.css";
import "./styles/mobile-fixes.css";

function App() {
  // Set up emergency loading reset monitoring in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 Setting up emergency loading state monitoring");
      addEmergencyResetButton();
      const cleanup = monitorLoadingStates();
      return cleanup;
    }
  }, []);

  return (
    <ErrorBoundary level="app">
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <OAuthRedirectHandler />
            <div className="min-h-screen bg-gray-50">
              <ErrorBoundary level="page">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/books" element={<BookListing />} />
                  <Route path="/books/:id" element={<BookDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/confirm" element={<Confirm />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/oauth-test" element={<OAuthTest />} />
                  <Route path="/debug-test" element={<DatabaseDebugTest />} />

                  {/* Public user profiles - no authentication required */}
                  <Route path="/user/:id" element={<UserProfile />} />

                  {/* Protected Routes */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/create-listing"
                    element={
                      <ProtectedRoute>
                        <CreateListing />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout/:id"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/activity"
                    element={
                      <ProtectedRoute>
                        <ActivityLog />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <ProtectedRoute>
                        <Notifications />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/edit-book/:id"
                    element={
                      <ProtectedRoute>
                        <EditBook />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <AdminProtectedRoute>
                        <Admin />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/reports"
                    element={
                      <AdminProtectedRoute>
                        <AdminReports />
                      </AdminProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </div>
            <Toaster />
            <OAuthDebugInfo />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
