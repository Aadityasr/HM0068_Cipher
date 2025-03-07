import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      let userId = localStorage.getItem("userId")?.trim();
      console.log("User ID:", userId);

      if (!userId) {
        setError("User ID not found in localStorage.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/appointments/${userId}`);
        setAppointments(response.data || []); // Ensure it's always an array
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            setError("No appointments found for this user.");
          } else {
            setError(`Error ${err.response.status}: ${err.response.data.error}`);
          }
        } else {
          setError("Failed to fetch appointments. Please try again later.");
        }
        console.error("Error fetching appointments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (isLoading) {
    return <p className="text-center text-pink-500 text-lg">Loading appointments...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Your Appointments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full max-w-5xl">
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            const appointmentDate = new Date(appointment.date || appointment.dateTime);
            
              const randomHour = Math.floor(Math.random() * (18 - 9 + 1)) + 9;
              const randomMinute = Math.floor(Math.random() * 60);
              appointmentDate.setHours(randomHour, randomMinute);
          
            return (
              <Card 
                key={appointment._id || Math.random()} 
                className="shadow-lg rounded-xl border border-pink-300 hover:shadow-xl transition duration-300 bg-white"
              >
                <CardHeader className="bg-pink-100 rounded-t-xl py-4">
                  <CardTitle className="text-pink-700 text-xl font-semibold text-center">
                    Dr. {appointment.doctorName || "Unknown Doctor"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700">
                    <strong className="text-pink-600">Date:</strong> {appointmentDate.toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-pink-600">Time:</strong> {appointmentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-pink-600">Email:</strong> {appointment.email || "Not provided"}
                  </p>
                  <div className="mt-4 text-center">
                    <Badge className={appointment.reminderSent ? "bg-pink-500 text-white" : "bg-gray-300 text-gray-700"}>
                      {appointment.reminderSent ? "Reminder Sent" : "Pending Reminder"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p className="text-center text-gray-500 text-lg">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
