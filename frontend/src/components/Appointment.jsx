import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function MakeAppointment() {
  const navigate = useNavigate();

  // Simulate a logged-in state
  const loggedin = true; // Update based on actual auth state

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Book an Appointment</h2>
        
        {/* Appointment Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700">Appointment Date</label>
            <input
              type="date"
              id="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-gray-700">Appointment Time</label>
            <input
              type="time"
              id="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          
          <div className="flex justify-center mt-6">
            <Button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2"
              onClick={() => {
                if (!loggedin) {
                  navigate("/signup");
                } else {
                  // Logic to submit the appointment request
                  console.log("Appointment booked!");
                  navigate("/confirmation"); // Navigate to confirmation page after booking
                }
              }}
            >
              Confirm Appointment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
