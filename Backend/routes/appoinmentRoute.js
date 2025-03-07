const express = require("express");
const router = express.Router();
const Appointment = require("../model/appoinments");
const mongoose = require("mongoose");

router.post("/schedule", async (req, res) => {
    try {
        console.log("📩 Received request:", req.body);
        const { userId, doctorName, date, email, time } = req.body;

        // Validate required fields
        if (!userId || !doctorName || !date || !email || !time) {
            console.log("❌ Missing required fields");
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate time format (HH:mm)
        if (!/^\d{2}:\d{2}$/.test(time)) {
            console.log("❌ Invalid time format received:", time);
            return res.status(400).json({ error: "Invalid time format. Use HH:mm (e.g., 14:30)" });
        }

        console.log("✅ Storing time as string:", time);

        // ✅ Save appointment
        const generateRandomTime = () => {
            const hours = Math.floor(Math.random() * 9) + 9; // Random hour between 9 and 17 (9 AM to 5 PM)
            const minutes = Math.floor(Math.random() * 60); // Random minutes (0 to 59)
            return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        };
        
        const newAppointment = new Appointment({
            userId,
            doctorName,
            date: new Date("2025-03-21T00:00:00.000Z"), // Fixed date
            time: generateRandomTime(), // ✅ Assign a random time
            email,
            reminderSent: false
        });
        
        
        

        await newAppointment.save();
        res.status(201).json({ message: "✅ Appointment scheduled successfully", appointment: newAppointment });

    } catch (error) {
        console.error("🔥 Server error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.get("/appointments/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const objectIdUser = new mongoose.Types.ObjectId(userId); // ✅ Convert userId to ObjectId
        const appointments = await Appointment.find({ userId: objectIdUser });

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found for this user" });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

module.exports = router;
