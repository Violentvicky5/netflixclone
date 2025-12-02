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
import AdminDashboard from "./pages/AdminDashboard";
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
        <Route path="/Userdashboard" element={<Userdashboard />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/AdminLoginPage" element={<AdminLoginPage />}></Route>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
