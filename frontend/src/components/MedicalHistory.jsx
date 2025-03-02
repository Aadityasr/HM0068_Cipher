import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MedicalHistoryForm = () => {
  const [formData, setFormData] = useState({
    userId : localStorage.getItem("userId"),
    name: "",
    age: "",
    trimester: "",
    weight: "",
    height: "",
    medicalConditions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["age", "trimester", "weight", "height"].includes(name) ? Number(value) : 
              name === "medicalConditions" ? value.split(",").map((item) => item.trim()) :
              value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post("http://localhost:3000/health", formData);
      if (response) {
        navigate("/welcome");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="mt-20 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">Medical History Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Full Name"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Age"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Trimester:</label>
          <select
            name="trimester"
            value={formData.trimester}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Trimester</option>
            <option value="1">First Trimester (1-12 weeks)</option>
            <option value="2">Second Trimester (13-26 weeks)</option>
            <option value="3">Third Trimester (27-40 weeks)</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Weight in kg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Height in cm"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Medical Conditions:</label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions.join(", ")} // Display as comma-separated string
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter conditions separated by commas (e.g., Anemia, Diabetes)"
          />
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-md"
          >
            Submit Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MedicalHistoryForm;
