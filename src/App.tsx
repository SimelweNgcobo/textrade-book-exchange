import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './components/CartProvider';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Confirm from './pages/Confirm';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import BookListing from './pages/BookListing';
import BookDetails from './pages/BookDetails';
import CreateListing from './pages/CreateListing';
import EditBook from './pages/EditBook';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AdminReports from './pages/AdminReports';
import Notifications from './pages/Notifications';
import ActivityLog from './pages/ActivityLog';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ReportForm from './pages/ReportForm';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/confirm" element={<Confirm />} />
                <Route path="/books" element={<BookListing />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/user/:userId" element={<UserProfile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                
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
                  path="/edit-book/:bookId"
                  element={
                    <ProtectedRoute>
                      <EditBook />
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
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/activity-log"
                  element={
                    <ProtectedRoute>
                      <ActivityLog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/report"
                  element={
                    <ProtectedRoute>
                      <ReportForm />
                    </ProtectedRoute>
                  }
                />
                
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
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
