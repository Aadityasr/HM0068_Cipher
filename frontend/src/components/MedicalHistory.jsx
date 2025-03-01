import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const MedicalHistoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    trimester: "",
    allergies: "",
    medications: "",
    medicalConditions: "",
    familyMedicalHistory: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can send the form data to a server or save it as needed
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">Medical History Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Full Name"
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
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Trimester Section */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Trimester:</label>
          <select
            name="trimester"
            value={formData.trimester}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Trimester</option>
            <option value="First Trimester">First Trimester (0-12 weeks)</option>
            <option value="Second Trimester">Second Trimester (13-26 weeks)</option>
            <option value="Third Trimester">Third Trimester (27-40 weeks)</option>
          </select>
        </div>

        {/* Medical History Section */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Do you have any allergies?</label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Describe your allergies"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Current Medications:</label>
          <textarea
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="List any medications you are currently taking"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Any known medical conditions?</label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Describe any medical conditions you have"
          />
        </div>

        {/* Family Medical History Section */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Family Medical History:</label>
          <textarea
            name="familyMedicalHistory"
            value={formData.familyMedicalHistory}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Any significant family medical history"
          />
        </div>

        {/* Emergency Contact Section */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Emergency Contact Name:</label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Emergency Contact Name"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Emergency Contact Number:</label>
          <input
            type="text"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Emergency Contact Number"
          />
        </div>

        {/* Submit Button */}
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
