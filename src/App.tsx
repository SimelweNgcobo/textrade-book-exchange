
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

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
import ReportForm from './pages/ReportForm';
import AdminReports from './pages/AdminReports';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/books" element={<BookListing />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/activity" element={<ActivityLog />} />
            <Route path="/report" element={<ReportForm />} />
          </Route>
          
          {/* Admin Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/reports" element={<AdminReports />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </Router>
  );
}

export default App;
