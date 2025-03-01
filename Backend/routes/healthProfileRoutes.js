const express = require("express");
const axios = require("axios");
const HealthProfile = require("../model/healthProfile");

const router = express.Router();

// Load API keys from environment variables
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_API_KEY = process.env.EDAMAM_API_KEY;
const WORKOUT_API_KEY = process.env.WORKOUT_API_KEY;

// ✅ Save or Update User Health Profile
router.post("/", async (req, res) => {  
    try {
        const { userId, name, age, trimester, weight, height, medicalConditions } = req.body;
        let profile = await HealthProfile.findOne({ userId });

        if (profile) {
            // ✅ Update existing profile
            profile.name = name;
            profile.age = age;
            profile.trimester = trimester;
            profile.weight = weight;
            profile.height = height;
            profile.medicalConditions = medicalConditions;
        } else {
            // ✅ Create new profile
            profile = new HealthProfile({ userId, name, age, trimester, weight, height, medicalConditions });
        }

        await profile.save();
        res.status(201).json({ message: "Health Profile Saved!", profile });
    } catch (error) {
        console.error("Error saving health profile:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Fetch Meal Plan from Edamam API
const fetchMealPlan = async (trimester, medicalConditions) => {
    const query = medicalConditions.length > 0 ? medicalConditions.join(",") : "pregnancy";
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_API_KEY}`;

    try {
        console.log("Fetching meal plan from:", url);
        const response = await axios.get(url, {
            headers: { "Edamam-Account-User": "default" } // REQUIRED HEADER
        });

        console.log("Meal Plan API Response:", response.data);
        return response.data.hits.map(meal => meal.recipe.label);
    } catch (error) {
        console.error("Meal Plan API Error:", error.response?.data || error.message);
        return ["Meal plan not available"];
    }
};

// ✅ Fetch Exercise Plan from Workout API
const fetchExercisePlan = async (trimester) => {
    const url = `https://api.api-ninjas.com/v1/exercises?type=stretching`;
    try {
        console.log("Fetching exercise plan from:", url);
        const response = await axios.get(url, { headers: { "X-Api-Key": WORKOUT_API_KEY } });
        console.log("Exercise Plan API Response:", response.data);
        return response.data.map(exercise => exercise.name);
    } catch (error) {
        console.error("Exercise Plan API Error:", error.response?.data || error.message);
        return ["Exercise plan not available"];
    }
};

// ✅ API Endpoint: Get AI-Based Meal & Exercise Plan
router.get("/recommend/:userId", async (req, res) => {
    try {
        const profile = await HealthProfile.findOne({ userId: req.params.userId });
        if (!profile) return res.status(404).json({ message: "Profile Not Found" });

        const mealPlan = await fetchMealPlan(profile.trimester, profile.medicalConditions);
        const exercisePlan = await fetchExercisePlan(profile.trimester);

        res.json({ mealPlan, exercisePlan });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;