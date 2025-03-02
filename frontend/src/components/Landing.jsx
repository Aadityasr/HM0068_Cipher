import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Features from "./Features";
import PregnancyTips from "./PregnancyTips";
import DoctorsPage from "./Doctors";
import MakeAppointment from "./Appointment";
import MedicalHistoryForm from "./MedicalHistory";
import HeroComp from "./HeroComp";
import CareGuidelines from "./CareGuidelines";
import ExerciseDiet from "./DietAndExercise";

export default function Landing() {
  const [position, setPosition] = useState(110); // Start from the right
  const [visible, setVisible] = useState(true); // Control visibility

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev <= -20) {
          setVisible(false); // Hide before resetting position
          setTimeout(() => {
            setPosition(110); // Reset position after a short delay
            setVisible(true); // Make it visible again
          }, 50);
          return prev;
        }
        return prev - 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Inject Botpress Webchat script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    // Inject Botpress bot-specific script
    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/03/01/20/20250301202100-IT77EUA9.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <img src="/background/baby-back-1.jpg" className="w-full h-[70vh] object-cover" />

        {/* Moving Baby Crawling Image */}
        {visible && (
          <img
            src="/background/baby-crawl.gif"
            className="absolute bottom-5 w-32 h-20 transition-all duration-200 ease-linear"
            style={{ left: `${position}%` }}
          />
        )}

        <img src="/background/baby.gif" className="absolute bottom-70 w-32 h-30"></img>
        <img src="/background/stars.png" className="absolute bottom-95 right-10 w-48 h-52" />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <img
            src="/background/logo.png"
            className="w-48 h-52 mb-4"
          />
          <div className="text-6xl font-bold text-pink-600">
            Mother Care
          </div>
        </div>
      </div>
      <Features />
    </div>
  );
}

