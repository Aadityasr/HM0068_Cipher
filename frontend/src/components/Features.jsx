import { Baby, Heart, Stethoscope, MessageSquare, ShoppingBag } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Baby className="w-10 h-10 text-pink-500" />,
      title: "Pregnancy Tips",
      description: "Get expert-backed tips to ensure a safe and healthy pregnancy journey.",
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-pink-500" />,
      title: "Find Doctors",
      description: "Monitor your pregnancy health with our smart tracking tools.",
    },
    {
      icon: <Heart className="w-10 h-10 text-pink-500" />,
      title: "Health Tracking",
      description: "Monitor your pregnancy health with our smart tracking tools.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-pink-500" />,
      title: "Community Support",
      description: "Join a supportive community of mothers and experts for real-time advice.",
    },
    {
      icon: <ShoppingBag className="w-10 h-10 text-pink-500" />,
      title: "Baby Essentials",
      description: "Shop curated maternity and baby care essentials with ease.",
    },
  ];

  return (
    <div className="bg-pink-50 py-12 px-6">
      <h2 className="text-center text-3xl font-bold text-pink-600 mb-8">Why Choose Us?</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            {feature.icon}
            <h3 className="text-lg font-semibold mt-3 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 text-center mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
