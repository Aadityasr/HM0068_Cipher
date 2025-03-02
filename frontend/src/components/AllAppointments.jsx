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
        console.log("usere",userId);
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
          // Handle specific error messages from backend
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
    return <p className="text-center text-gray-500">Loading appointments...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <Card key={appointment._id || Math.random()} className="shadow-lg">
            <CardHeader>
              <CardTitle>{appointment.doctorName || "Unknown Doctor"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {appointment.date || appointment.dateTime ? new Date(appointment.date || appointment.dateTime).toLocaleDateString() : "N/A"}</p>
              <p><strong>Time:</strong> {appointment.time || appointment.dateTime ? new Date(appointment.dateTime).toLocaleTimeString() : "N/A"}</p>
              <p><strong>Email:</strong> {appointment.email || "Not provided"}</p>
              <Badge variant={appointment.reminderSent ? "success" : "secondary"}>
                {appointment.reminderSent ? "Reminder Sent" : "Pending Reminder"}
              </Badge>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No appointments found.</p>
      )}
    </div>
  );
};

export default Appointments;
