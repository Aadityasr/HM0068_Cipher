import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-pink-50 min-h-screen">
      <Card className="w-full max-w-lg shadow-lg border border-pink-300 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-pink-600 text-2xl font-semibold flex items-center justify-center">
            <Heart className="text-pink-500 mr-2" /> Pregnancy Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-center text-pink-700">
                <CheckCircle className="text-pink-500 mr-2" size={20} /> {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}