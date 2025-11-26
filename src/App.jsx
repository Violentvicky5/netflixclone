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

 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
