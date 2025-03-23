const cron = require("node-cron");
const moment = require("moment");
const nodemailer = require("nodemailer");
const Appointment = require('../model/appoinments');
const User = require('../model/user');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

// Manual Appointment Reminder (Every Minute Check for 5 Min Before Appointments)
cron.schedule("* * * * *", async () => {
    const now = moment.utc();
    const reminderTime = moment.utc().add(5, "minutes");

    console.log("Checking for appointment reminders...");
    
    try {
        const upcomingAppointments = await Appointment.find({
            date: { $gte: now.toDate(), $lte: reminderTime.toDate() },
            reminderSent: false
        });

        for (let appointment of upcomingAppointments) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: appointment.email,
                subject: "Appointment Reminder",
                text: `Hello, you have an appointment with ${appointment.doctorName} at ${moment(appointment.date).format("hh:mm A")} on ${moment(appointment.date).format("YYYY-MM-DD")}.`
            };

            await transporter.sendMail(mailOptions);
            console.log("Reminder email sent to:", appointment.email);

            await Appointment.findByIdAndUpdate(appointment._id, { reminderSent: true });
        }

    } catch (error) {
        console.error("Error checking reminders:", error);
    }
});


// 📅 Regular Pregnancy Daily Reminder System (Runs Every Day at 8:00 AM)
cron.schedule("0 8 * * *", async () => {
    console.log("🔄 Sending Regular Pregnancy Reminders...");

    try {
        const pregnantUsers = await User.find({ isPregnant: true });
        
        if (pregnantUsers.length === 0) {
            console.log("No Pregnant Users Found");
            return;
        }

        for (let user of pregnantUsers) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "MotherCare Daily Pregnancy Tips & Reminders",
                text: `Hello ${user.name},\n\n🌿 Here are today's pregnancy tips:\n\n1. Stay hydrated.\n2. Take your prescribed supplements.\n3. Avoid Junk Foods.\n4. Light Exercise like Walking.\n\n❤️ Take care of yourself!\nMotherCare Team`
            };

            await transporter.sendMail(mailOptions);
            console.log(`Daily Reminder Sent to: ${user.email}`);
        }

    } catch (error) {
        console.error("Error in Regular Pregnancy Reminder:", error);
    }
});

console.log("🔄 CRON Jobs Running Successfully...");
