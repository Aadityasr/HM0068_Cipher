import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Exercise() {
  const [age, setAge] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [bp, setBp] = useState("");
  const [bodyTemp, setBodyTemp] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState([]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    if (!age || !bloodSugar || !bp || !bodyTemp || !heartRate) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        features: [age, bp, bloodSugar, bodyTemp, heartRate],
      });

      if (response.data.prediction) {
        setPrediction(response.data.prediction);
        showExercises(response.data.prediction); // Update exercises based on prediction
      } else {
        setError("Error fetching prediction.");
      }
    } catch (err) {
      setError("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  const showExercises = (prediction) => {
    // Clean the prediction string by removing the " Risk" part and convert to lowercase
    const cleanPrediction = prediction.toLowerCase().replace(" risk", "");
    console.log(cleanPrediction);

    // Mapping of exercises to risk levels based on the provided file names
    const exercisesMapping = {
      low: [
        { name: "Pelvic Tilt", gif: "/gifs/low risk/pelvic_tilt.gif" },
        { name: "Prenatal Yoga", gif: "/gifs/low risk/prenatal_yoga.gif" },
        { name: "Stationary Cycling", gif: "/gifs/low risk/stationary_cycling.gif" },
      ],
      high: [
        { name: "Chair Exercises", gif: "/gifs/high risk/chair_exercises.gif" },
        { name: "Leg Raises", gif: "/gifs/high risk/leg_raises.gif" },
        { name: "Slow Walking", gif: "/gifs/high risk/slow_walking.gif" },
      ],
      medium: [
        { name: "Breathing Exercises", gif: "/gifs/medium risk/breathing_exercises.gif" },
        { name: "Modified Squats", gif: "/gifs/medium risk/modified_squats.gif" },
        { name: "Seated Stretching", gif: "/gifs/medium risk/seated_stretching.gif" },
        { name: "Water Exercises", gif: "/gifs/medium risk/water_exercises.gif" },
      ],
    };

    // Set exercises based on cleaned prediction
    if (exercisesMapping[cleanPrediction]) {
      setExercises(exercisesMapping[cleanPrediction]);
    } else {
      setExercises([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Your Health Profile 🏋️‍♀️
      </h1>

      {/* User Input Form */}
      <Card className="bg-blue-100 shadow-lg rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold text-blue-700">Enter Health Details</h2>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-gray-700">Age</label>
              <input
                type="number"
                className="w-full p-2 mt-2 border rounded"
                value={age}
                onChange={(e) => handleInputChange(e, setAge)}
              />
            </div>

            <div>
              <label className="text-gray-700">Blood Sugar</label>
              <input
                type="number"
                className="w-full p-2 mt-2 border rounded"
                value={bloodSugar}
                onChange={(e) => handleInputChange(e, setBloodSugar)}
              />
            </div>

            <div>
              <label className="text-gray-700">Blood Pressure</label>
              <input
                type="text"
                className="w-full p-2 mt-2 border rounded"
                value={bp}
                onChange={(e) => handleInputChange(e, setBp)}
              />
            </div>

            <div>
              <label className="text-gray-700">Body Temperature</label>
              <input
                type="number"
                className="w-full p-2 mt-2 border rounded"
                value={bodyTemp}
                onChange={(e) => handleInputChange(e, setBodyTemp)}
              />
            </div>

            <div>
              <label className="text-gray-700">Heart Rate</label>
              <input
                type="number"
                className="w-full p-2 mt-2 border rounded"
                value={heartRate}
                onChange={(e) => handleInputChange(e, setHeartRate)}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4 text-center">
              <Button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Risk Prediction"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display Prediction */}
      {prediction && (
        <div className="mt-6 bg-blue-50 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-blue-700">Risk Prediction</h3>
          <p className="text-gray-700">Risk Level: {prediction}</p>
        </div>
      )}

      {/* Display Exercises Based on Prediction */}
{exercises.length > 0 && (
  <div className="mt-6 bg-blue-50 p-6 rounded-2xl">
    <h3 className="text-xl font-semibold text-blue-700">Recommended Exercises</h3>
    <div className="grid grid-cols-2 gap-4 mt-4">
      {exercises.map((exercise, index) => (
        <div key={index} className="text-center">
          {/* Increased size of images */}
          <img
            src={exercise.gif}
            alt={exercise.name}
            className="w-64 h-64 object-cover rounded-lg" // Adjust width (w-64) and height (h-64)
          />
          <p className="mt-2 text-gray-700">{exercise.name}</p>
        </div>
      ))}
    </div>
  </div>
)}

      {/* Display Error */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
}
