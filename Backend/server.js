const express = require('express')
const app = express();
app.use(express.json()); 
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require("node-cron");

dotenv.config();
console.log("EMAIL:", process.env.EMAIL);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

 require('./utils/reminder')

app.use(cors());
cron.schedule("* * * * *", async () => {  })// Runs every minute for testing


const PORT = process.env.PORT || 3000;

// // Connect to MongoDB
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => console.error(err));


//import db
const db = require('./db')

//Router import
const appointmentRoutes = require('./routes/appoinmentRoute')
app.use('/api',appointmentRoutes)

const userRoutes = require('./routes/userRouter')
app.use('/login',userRoutes)

const userAuth = require('./auth')
app.use(userAuth)

const healthProfile = require('./routes/healthProfileRoutes')
app.use('/health', healthProfile);
// app.use('/recommend',healthProfile)

//community
const communityRoutes = require("./routes/communityRoutes");
app.use("/community", communityRoutes);

//Server check 
app.get('/', (req,res)=>{
    res.send("Server is on")
})

console.log("EMAIL:", process.env.EMAIL);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);


//Port and server status
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// app.listen(3000,()=>{
//     console.log("server is Ready on port 3000")
// })