import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

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

import "./App.css";

function App() {
  return (
    <ErrorBoundary level="app">
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
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
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
