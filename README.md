# MotherCare

## **Technology Stack and Features**

### **Frontend:**
- ⚡ **React.js** for a modern, fast, and responsive user interface.
- 🎨 **Tailwind CSS** for a clean and customizable UI.
- 💅 **ShadCN** for enhanced UI components.

### **Backend:**
- 🚀 **Node.js** for a scalable backend API.
- 🔄 **Express.js** for handling API requests.
- 🛢 **MongoDB** as the NoSQL database.
- ⏲ **Cron Jobs** for scheduling tasks and reminders.

### **Core Features:**
✅ **User Authentication** – Secure login and registration for users.  
✅ **Appointment Scheduling & Reminders** – Helps users track medical appointments.  
✅ **Personalized Meal Plans** – Tailored nutrition recommendations.  
✅ **Exercise Recommendations** – Safe workout plans based on pregnancy stage.  
✅ **Community Discussions** – A support system for expectant mothers.  
✅ **Secure Password Hashing** – Ensuring user data security.  
✅ **JWT Authentication** – Secure API access using JSON Web Tokens.  

---

## **Problem Statement & Why MotherCare is Useful**

### **Problem Statement:**
Pregnancy is a critical phase in a woman's life that requires proper health monitoring, guidance, and medical support. Many expectant mothers struggle with:  
- ❌ Lack of proper nutrition guidance.  
- ❌ Uncertainty about safe exercise routines.  
- ❌ Forgetting doctor appointments.  
- ❌ Limited community support and access to experts.  

### **Why MotherCare is the Solution?**
MotherCare is a **comprehensive pregnancy health management system** that provides:  
- 🥗 **Personalized Meal Plans** – Ensuring proper nutrition for mother and baby.  
- 🏃‍♀️ **Exercise Recommendations** – Safe and trimester-specific workouts.  
- 📅 **Appointment Tracking & Reminders** – Never miss a check-up.  
- 💬 **Community Support** – Connect with others on the same journey.  
- 🔔 **Automated Reminders (Cron Jobs)** – To keep users on track with their health goals.  

MotherCare empowers pregnant women with structured health tracking, ensuring a **safer and healthier pregnancy journey.** 🚀  

---

## **How to Use MotherCare**

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/yourusername/mothercare.git
cd mothercare

## **Step 2: Install Dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## **Step 3: Setup Environment Variables**
Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## **Step 4: Start the Application**
```bash
# Start the backend server
cd backend
npm run dev

# Start the frontend
cd ../frontend
npm start
```

## **Project Structure**
```
MotherCare/
│── backend/                 # Node.js & Express backend
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Authentication & error handling
│   ├── config/              # Configuration files
│   ├── server.js            # Entry point
│
│── frontend/                # React.js frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API calls
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # Entry point
│
│── README.md                # Project documentation
```

## **API Endpoints**
### **User Authentication**
- **POST** `/api/auth/register` – Register a new user.
- **POST** `/api/auth/login` – Authenticate user and return JWT.

### **Appointments**
- **POST** `/api/appointments/create` – Schedule an appointment.
- **GET** `/api/appointments/user/:id` – Get user's appointments.

### **Meal Plans & Exercises**
- **GET** `/api/mealplans/:userId` – Get personalized meal plans.
- **GET** `/api/exercises/:userId` – Get recommended exercises.

## **Contributing**
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## **License**
This project is licensed under the MIT License.

## **Contact**
📧 Email: adityarampure10@gmail.com  
🌐 Website: [MotherCare](https://hm-0068-cipher.vercel.app/)

