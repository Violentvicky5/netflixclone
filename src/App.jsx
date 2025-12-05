import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeContent from "./components/HomeContent";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUp2 from "./pages/SignUp2";
import SignUp3 from "./pages/SignUp3";
import ChoosePlan from "./pages/ChoosePlan";
import Payment from "./pages/Payment";
import WelcomePage from "./pages/WelcomePage";
import Userdashboard from "./pages/Userdashboard";
import ForgotPassword from "./pages/ForgotPassword";

import AdminLoginPage from "./pages/AdminLoginPage";
import DashboardLayout from "./pages/DashboardLayout";

// Admin children
import AdminHome from "./pages/admin/AdminHome";
import UserManagement from "./pages/admin/UserManagement";
import MovieManagement from "./pages/admin/MovieManagement";
import MovieDelete from "./pages/admin/MovieDelete";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignUp2" element={<SignUp2 />} />
        <Route path="/SignUp3" element={<SignUp3 />} />
        <Route path="/ChoosePlan" element={<ChoosePlan />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/WelcomePage" element={<WelcomePage />} />
        <Route path="/Userdashboard" element={<Userdashboard />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/AdminLoginPage" element={<AdminLoginPage />} />
        <Route path="/DashboardLayout" element={<DashboardLayout />} />
        {/* ADMIN DASHBOARD WITH NESTED ROUTES */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminHome />} /> {/* /admin */}
          <Route path="users" element={<UserManagement />} />{" "} {/* /admin/users */}
          <Route path="movies" element={<MovieManagement />} />{" "}{/* /admin/movies */}
         <Route path="moviesdelete" element={<MovieDelete />} />
      
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
