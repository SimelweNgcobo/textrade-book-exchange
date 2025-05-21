
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookListing from "./pages/BookListing";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ActivityLog from "./pages/ActivityLog";
import ReportForm from "./pages/ReportForm";
import AdminReports from "./pages/AdminReports";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => {
  // Set document title
  useEffect(() => {
    document.title = "Rebooked - Buy and Sell New & Used Books";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<BookListing />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/user/:userId" element={<UserProfile />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/activity" element={
                <ProtectedRoute>
                  <ActivityLog />
                </ProtectedRoute>
              } />
              <Route path="/report" element={
                <ProtectedRoute>
                  <ReportForm />
                </ProtectedRoute>
              } />
              <Route path="/create-listing" element={
                <ProtectedRoute>
                  <CreateListing />
                </ProtectedRoute>
              } />
              <Route path="/checkout/:id" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <AdminProtectedRoute>
                  <Admin />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <AdminProtectedRoute>
                  <AdminReports />
                </AdminProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
