import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import PregnancyTips from "./components/PregnancyTips";
import Navbar from "./components/Navbar"; // ✅ Import Navbar
import DoctorsPage from "./components/Doctors";
import Login from "./components/Login";
import OtpVerification from "./components/OtpVerify";
import Welcome from "./components/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Navbar />  {/* ✅ Navbar will always be visible */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pregnancyTips" element={<PregnancyTips />} />
        <Route path = "/doctors" element = {<DoctorsPage/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path = "/welcome" element = {<Welcome/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
