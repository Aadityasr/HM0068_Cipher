Pregnancy Health Management System
Overview
This is a full-stack application designed to help users manage their pregnancy health by providing meal plans, exercise recommendations, and appointment tracking. The system includes:

User Authentication

Appointment Scheduling & Reminders

Personalized Health Recommendations

Community Discussions

Tech Stack
Frontend:
React.js

Tailwind CSS

ShadCN UI

Backend:
Node.js

Express.js

MongoDB

Cron (for scheduling tasks)

Features
1. User Authentication
Secure login and registration using JWT.

User credentials stored securely in MongoDB.

2. Appointment Scheduling & Reminders
Users can book appointments with doctors.

Automatic reminders using node-cron.

3. Personalized Health Recommendations
Fetches user health data (trimester, medical conditions, weight, height).

Provides meal and exercise plans based on user profile.

4. Community Discussions
Users can participate in forums to discuss pregnancy-related topics.

Installation & Setup
Prerequisites
Node.js installed

MongoDB running locally or a cloud database (MongoDB Atlas)

1. Clone the Repository
git clone https://github.com/your-repo.git
cd your-repo
2. Setup Backend
cd backend
npm install
Create a .env file in the backend directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL=your_email
EMAIL_PASS=your_email_password
Start the backend server:

npm start
3. Setup Frontend
cd frontend
npm install
npm start
API Endpoints
User Authentication
POST /login - User login

POST /register - User registration

Appointments
GET /api/appointments/:userId - Get user appointments

POST /api/appointments - Create a new appointment

Health Profile & Recommendations
GET /api/recommend/:userId - Get meal and exercise recommendations

Cron Jobs
Used for sending appointment reminders automatically.

Runs every minute to check and trigger reminders.

