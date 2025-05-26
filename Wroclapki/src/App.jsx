import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Booking from "./pages/Booking.jsx";
import BookingsList from "./pages/BookingsList";
import Reviews from "./pages/Reviews";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        {/* Основной контент с отступом сверху, чтобы не налезал на Navbar */}
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <Search />
                </PrivateRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <BookingsList />
                </PrivateRoute>
              }
            />

            {/* Сделали страницу отзывов открытой */}
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
