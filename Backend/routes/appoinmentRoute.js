const express = require("express");
const router = express.Router();
const Appointment = require("../model/appoinments");
const moment = require("moment");

router.post("/schedule", async (req, res) => {
    try {
        console.log("Received request:", req.body);

        const { userId, doctorName, date, email } = req.body;

        if (!userId || !doctorName || !date || !email) {
            console.log("Missing required fields");
            return res.status(400).json({ error: "All fields are required" });
        }

        const newAppointment = new Appointment({
            userId,
            doctorName,
            date: new Date(date),  // Convert to Date object before saving
            email,
            reminderSent: false
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment scheduled successfully" });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});



module.exports = router;
