import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Exercise() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [diet, setDiet] = useState(null); // To store personalized diet data
  const [dietLoading, setDietLoading] = useState(false);
  const [dietError, setDietError] = useState(null);

  useEffect(() => {
    let userId = localStorage.getItem("userId")?.trim();
    console.log("usere", userId);
    if (!userId) {
      setError("User ID not found in localStorage.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/health/userinfo/${userId}`);
        setHealthData(response.data);
      } catch (err) {
        setError("Failed to fetch health data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchDiet = async () => {
    setDietLoading(true);
    setDietError(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setDietError("User ID not found.");
        return;
      }
      const response = await axios.get(`http://localhost:3000/health/recommend/${userId}`);
      console.log(response.data);
      setDiet(response.data.mealPlan); // Only store the mealPlan array
    } catch (err) {
      setDietError("Failed to fetch personalized diet");
    } finally {
      setDietLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading health data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Your Health Profile 🏋️‍♀️
      </h1>
      <Card className="bg-blue-100 shadow-lg rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold text-blue-700">{healthData.name}</h2>
          <p className="text-gray-700">Age: {healthData.age}</p>
          <p className="text-gray-700">Trimester: {healthData.trimester}</p>
          <p className="text-gray-700">Weight: {healthData.weight} kg</p>
          <p className="text-gray-700">Height: {healthData.height} cm</p>
          <p className="text-gray-700">Recommended Calories: {healthData.recommendedCalories} kcal/day</p>
          <p className="text-gray-700">Hydration Needs: {healthData.hydrationNeeds} L/day</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-blue-700">Medical Conditions:</h3>
            {Array.isArray(healthData.medicalConditions) && healthData.medicalConditions.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700">
                {healthData.medicalConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No medical conditions</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Show Personalized Diet Button */}
      <div className="mt-6 text-center">
        <Button
          onClick={fetchDiet}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
          disabled={dietLoading}
        >
          {dietLoading ? "Loading..." : "Show Personalized Diet"}
        </Button>
      </div>

      {/* Display Personalized Diet */}
      {dietLoading && <p className="text-center text-gray-500 mt-4">Loading personalized diet...</p>}
      {dietError && <p className="text-center text-red-500 mt-4">{dietError}</p>}
      {diet && (
        <div className="mt-6 bg-blue-50 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-blue-700">Personalized Diet</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {diet.map((meal, index) => (
              <li key={index}>{meal}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
