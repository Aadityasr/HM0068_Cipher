import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define routes where the Navbar should be fixed
  const fixedRoutes = ["/dashboard", "/profile", "/pregnancyTips"];

  // Normalize pathname (removes trailing slash)
  const currentPath = location.pathname.replace(/\/$/, ""); 
  const isFixed = fixedRoutes.includes(currentPath);


  // Check if the current route is '/book-appointment'
  const isBookAppointmentPage = currentPath === "/book-appointment";

  // Return null (hide navbar) if on the /book-appointment page
  if (isBookAppointmentPage) return null;

  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 bg-pink-100 shadow-md 
        ${isFixed ? "fixed top-0 w-full z-50" : ""}`}
    >
      {/* Logo */}
      <div className="flex items-center" onClick={()=>{
        navigate("/");
      }}>
        <img
          src="/background/logo.png"
          className="w-12 h-12 mr-4" // Adjusted size for logo
          alt="Logo"
        />
        <div className="text-2xl font-bold text-pink-600">MotherCare</div>
      </div>

      {/* Desktop Navigation */}
      <div className="flex justify-between hidden md:flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-pink-600">Home</Link>
        <Link to="/pregnancyTips" className="text-gray-700 hover:text-pink-600">Pregnancy Tips</Link>
        <Link to="/doctors" className="text-gray-700 hover:text-pink-600">Doctors</Link>  
        <Link to="/community" className="text-gray-700 hover:text-pink-600">Community</Link>
      </div>

      {/* Call to Action: Signup button shifted to the left */}
      <div className="flex">
      <Button 
          className="bg-pink-500 hover:bg-pink-600 text-white mr-6" 
          onClick={() => {
            navigate("welcome")
          }}
        >
          My Health
        </Button>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => navigate("/signup")}>
          Signup
        </Button>
      <div>
        
      </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 text-gray-700" />
          </SheetTrigger>
          <SheetContent side="left" className="p-6">
            <div className="text-lg font-bold text-pink-600 mb-4">MotherCare</div>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-gray-700 hover:text-pink-600">Home</Link>
              <Link to="/pregnancyTips" className="text-gray-700 hover:text-pink-600">Pregnancy Tips</Link>
              <Link to="/doctors" className="text-gray-700 hover:text-pink-600">Doctors</Link>
              <Link to="/contact" className="text-gray-700 hover:text-pink-600">Contact</Link>
            </nav>
            <div className="mt-6">
              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                Book Consultation
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
