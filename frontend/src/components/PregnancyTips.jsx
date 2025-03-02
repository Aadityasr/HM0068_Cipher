import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const tips = [
  "Eat a balanced diet rich in vitamins and minerals.",
  "Stay hydrated by drinking plenty of water.",
  "Get regular prenatal checkups to monitor your health.",
  "Exercise moderately to stay active and healthy.",
  "Ensure adequate rest and sleep for well-being.",
  "Manage stress through relaxation techniques.",
  "Avoid alcohol, smoking, and excessive caffeine.",
  "Take prenatal vitamins as recommended by your doctor.",
];

export default function PregnancyTips() {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-pink-100 to-pink-50">
      <Card className="w-full max-w-lg shadow-xl border border-pink-300 bg-white rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-pink-600 text-3xl font-bold flex items-center justify-center">
            <Heart className="text-pink-500 mr-2 animate-pulse" size={28} /> Pregnancy Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start text-pink-700 text-lg">
                <CheckCircle className="text-pink-500 mt-1 mr-3" size={22} /> {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button onClick = {()=>{
        navigate("/care-guidelines")
      }}className="mt-8 bg-pink-600 hover:bg-pink-700 text-white text-lg px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105">
        Care Guidelines
      </Button>
    </div>
  );
}
