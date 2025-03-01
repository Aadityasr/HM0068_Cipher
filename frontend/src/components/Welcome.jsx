import HeroComp from "./HeroComp";

export default function Welcome() {
  return (
    <div className="space-y-12 py-12 px-6 md:px-12">
      {/* First Hero Section */}
      <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <HeroComp 
          imageUrl="/background/babyDoctorCare.jpg"
          buttonText="Mark Your Appointment"
          buttonLink="/book-appointment"
        />
      </div>

      {/* Second Hero Section */}
      <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <HeroComp 
          imageUrl="/background/PregnantHealth.jpg"
          buttonText="Take Care of Your Health"
          buttonLink="/book-appointment"
        />
      </div>
    </div>
  );
}
