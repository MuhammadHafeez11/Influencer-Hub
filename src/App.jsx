"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "./redux/actions/userActions";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InfluencerListPage from "./pages/InfluencerListPage";
import InfluencerProfilePage from "./pages/InfluencerProfilePage";
import BookingPage from "./pages/BookingPage";
import ChatPage from "./pages/ChatPage";
import BusinessVerificationPage from "./pages/BusinessVerificationPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

// Route Protection
import PrivateRoute from "./components/auth/PrivateRoute";
// ⚠️ No AdminRoute import anymore

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(getUserDetails());
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/influencers" element={<InfluencerListPage />} />
          <Route path="/influencer/:id" element={<InfluencerProfilePage />} />

          {/* Protected User Routes */}
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/business-verification"
            element={
              <PrivateRoute>
                <BusinessVerificationPage />
              </PrivateRoute>
            }
          />

          {/* Admin Route - NO PROTECTION - Direct Access */}
          <Route path="/admin/*" element={<AdminDashboardPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
