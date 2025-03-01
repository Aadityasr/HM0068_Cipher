import { useState, useEffect } from "react";
import Navbar from "./Navbar";

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
          }, 50); // Delay before reappearing
          return prev;
        }
        return prev - 2; // Move left more slowly
      });
    }, 150); // Slower updates

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
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
        <img 
  src="/background/stars.png" 
  className="absolute bottom-95 right-10 w-48 h-52" 
/>


      </div>
    </div>
  );
}
