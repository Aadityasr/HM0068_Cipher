import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const doctors = [
  { id: 1, name: "Dr. Aditi Sharma", specialty: "Gynecologist", location: "Mumbai" },
  { id: 2, name: "Dr. Rahul Verma", specialty: "Obstetrician", location: "Delhi" },
  { id: 3, name: "Dr. Neha Kapoor", specialty: "Pediatrician", location: "Bangalore" },
  { id: 4, name: "Dr. Vikram Mehta", specialty: "Fertility Specialist", location: "Pune" },
];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doctor.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">
        Find a Doctor
      </h1>

      <Input
        type="text"
        placeholder="Search by name, specialty, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border border-pink-300"
      />

      <div className="grid gap-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="p-4 bg-pink-100 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold text-pink-700">{doctor.name}</h2>
              <p className="text-gray-700">{doctor.specialty}</p>
              <p className="text-gray-600">{doctor.location}</p>
              <Button className="mt-2 bg-pink-500 hover:bg-pink-600 text-white">
                Book Appointment
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No doctors found.</p>
        )}
      </div>
    </div>
  );
}
