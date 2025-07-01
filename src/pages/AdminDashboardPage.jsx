"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/common/Loader";
import Message from "../components/common/Message";
import BusinessVerificationPage from "./BusinessVerificationPage"; // ✅ Import your full verification page
import {
  getAdminStats,
} from "../redux/actions/adminActions";

/* -------------------- DASHBOARD OVERVIEW -------------------- */
const DashboardOverview = () => {
  const dispatch = useDispatch();

  const adminStats = useSelector((state) => state.adminStats) || {};
  const loading = adminStats.loading ?? false;
  const error = adminStats.error ?? null;
  const stats = adminStats.stats ?? {};

  useEffect(() => {
    dispatch(getAdminStats());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Message variant="error">{error}</Message>;

  const statCards = [
    { title: "Total Users", value: stats?.totalUsers || 0, color: "bg-blue-100" },
    { title: "Influencers", value: stats?.totalInfluencers || 0, color: "bg-purple-100" },
    { title: "Businesses", value: stats?.totalBusinesses || 0, color: "bg-green-100" },
    { title: "Total Bookings", value: stats?.totalBookings || 0, color: "bg-yellow-100" },
    { title: "Pending Verifications", value: stats?.pendingVerifications || 0, color: "bg-red-100" },
    { title: "Revenue (PKR)", value: stats?.totalRevenue?.toLocaleString() || "0", color: "bg-pink-100" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`${stat.color} rounded-xl p-6 shadow-sm`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className="p-3 rounded-full bg-white shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-gray-400 text-center">
        <p>📌 Your detailed booking and user lists would show here.</p>
      </div>
    </div>
  );
};

/* -------------------- MAIN ADMIN DASHBOARD -------------------- */
const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin) || {};
  const userInfo = userLogin.userInfo;

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      console.warn("⚠️ Skipping admin auth check in DEV build.");
      // navigate("/login"); // Uncomment for production
    }
  }, [userInfo, navigate]);

  const getActivePath = () => {
    const path = location.pathname.split("/admin")[1];
    if (!path || path === "/") return "dashboard";
    return path.substring(1);
  };

  const activePath = getActivePath();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-pink-500 to-violet-500 text-white">
                <h2 className="text-xl font-bold">Admin Dashboard</h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/admin"
                      className={`flex items-center px-4 py-3 rounded-lg ${
                        activePath === "dashboard" ? "bg-pink-50 text-pink-600" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/influencers"
                      className={`flex items-center px-4 py-3 rounded-lg ${
                        activePath === "influencers" ? "bg-pink-50 text-pink-600" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Influencers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/businesses"
                      className={`flex items-center px-4 py-3 rounded-lg ${
                        activePath === "businesses" ? "bg-pink-50 text-pink-600" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Businesses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/verifications"
                      className={`flex items-center px-4 py-3 rounded-lg ${
                        activePath === "verifications" ? "bg-pink-50 text-pink-600" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Verifications
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="bg-white rounded-xl shadow-md p-6">
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/influencers" element={<div>Influencers Management</div>} />
                <Route path="/businesses" element={<div>Businesses Management</div>} />

                {/* ✅ Fixed: Actual BusinessVerificationPage renders here */}
                <Route path="/verifications" element={<BusinessVerificationPage />} />

                <Route path="/bookings" element={<div>Bookings Management</div>} />
                <Route path="/settings" element={<div>Settings</div>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
