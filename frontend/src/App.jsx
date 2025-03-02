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
import MedicalHistoryForm from "./components/MedicalHistory";
import MakeAppointment from "./components/Appointment";
import Appointments from "./components/AllAppointments";
import CareGuidelines from "./components/CareGuidelines";
import ExerciseDiet from "./components/DietAndExercise";
import Exercise from "./components/Exercise";
import Community from "./components/Community";
import Diet from "./components/Diet";

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
        <Route path = "/medicalHistory" element = {<MedicalHistoryForm/>}/>
        <Route path = "/book-appointment" element = {<MakeAppointment/>}/>
        <Route path = "/all-appointments" element = {<Appointments/>}/>
        <Route path = "/care-guidelines" element = {<CareGuidelines/>}/>
        <Route path = "/diet-and-exercise" element = {<ExerciseDiet/>}/>
        <Route path = "/exercise" element = {<Exercise/>}/>
        <Route path = "/community" element = {<Community/>}/>
        <Route path = "/diet" element = {<Diet/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
