
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Index from './pages/Index';
import BookListing from './pages/BookListing';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import CreateListing from './pages/CreateListing';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import ContactUs from './pages/ContactUs';
import ActivityLog from './pages/ActivityLog';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ReportForm from './pages/ReportForm';
import AdminReports from './pages/AdminReports';
import Notifications from './pages/Notifications';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/books" element={<BookListing />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/create-listing" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
          <Route path="/checkout/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/activity" element={<ProtectedRoute><ActivityLog /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><ReportForm /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>} />
          <Route path="/admin/reports" element={<AdminProtectedRoute><AdminReports /></AdminProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </Router>
  );
}

export default App;
