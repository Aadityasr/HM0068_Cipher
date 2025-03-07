import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Menu, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context"; // AuthContext

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); // Get user & logout function

  // Modal state for profile
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Define routes where Navbar should be fixed
  const fixedRoutes = ["/dashboard", "/profile", "/pregnancyTips"];
  const currentPath = location.pathname.replace(/\/$/, ""); 
  const isFixed = fixedRoutes.includes(currentPath);

  if (currentPath === "/book-appointment") return null;

  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 bg-pink-100 shadow-md 
        ${isFixed ? "fixed top-0 w-full z-50" : ""}`}
    >
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img src="/background/logo.png" className="w-12 h-12 mr-4" alt="Logo" />
        <div className="text-2xl font-bold text-pink-600">MotherCare</div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-pink-600">Home</Link>
        <Link to="/pregnancyTips" className="text-gray-700 hover:text-pink-600">Pregnancy Tips</Link>
        <Link to="/doctors" className="text-gray-700 hover:text-pink-600">Doctors</Link>  
        <Link to="/community" className="text-gray-700 hover:text-pink-600">Community</Link>
        <Link to="/childShop" className="text-gray-700 hover:text-pink-600">Baby Essentials</Link>
        <Link to="/drugCheck" className="text-gray-700 hover:text-pink-600">Drug Check</Link>
        <Link to="/audio-books" className="text-gray-700 hover:text-pink-600">Audio Books</Link>
      </div>

      {/* Call to Action: My Health & Profile Modal */}
      <div className="flex items-center">
        <Button 
          className="bg-pink-500 hover:bg-pink-600 text-white mr-6" 
          onClick={() => navigate("/welcome")}
        >
          My Health
        </Button>

        {user ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <User 
                className="w-8 h-8 text-gray-700 cursor-pointer" 
                onClick={() => {
                  setOpen(true);
                  setShowProfile(false);
                }}
              />
            </DialogTrigger>
            <DialogContent className="p-4 w-64 rounded-lg shadow-lg">
              {showProfile ? (
                <div>
                  <div className="text-lg font-semibold text-pink-600"> Profile</div>
                  <div className="mt-2 space-y-3">
                    {/* Profile details form goes here */}
                    <Button 
                      className="w-full flex items-center gap-2" 
                      variant="outline" 
                      onClick={() => navigate("/profile")}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-lg font-semibold text-pink-600">Profile</div>
                  <div className="mt-2 space-y-3">
                    <Button 
                      className="w-full flex items-center gap-2" 
                      variant="outline" 
                      onClick={() => navigate("/dashboard")}
                    >
                      <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Button>
                    <Button 
                      className="w-full flex items-center gap-2" 
                      variant="outline" 
                      onClick={() => navigate("/profile")}
                    >
                      <Settings className="w-5 h-5" />  Profile
                    </Button>
                    <Button 
                      className="w-full flex items-center gap-2" 
                      variant="outline" 
                      onClick={() => navigate("/add-to-cart")}
                    >
                      <Settings className="w-5 h-5" />View Cart
                    </Button>
                    <Button 
                      className="w-full flex items-center gap-2 bg-red-500 text-white hover:bg-red-600" 
                      onClick={() => {
                        logout();
                        setOpen(false);
                        navigate("/login");
                      }}
                    >
                      <LogOut className="w-5 h-5" /> Logout
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        ) : (
          <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => navigate("/signup")}>
            Signup
          </Button>
        )}
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
        <Link to="/community" className="text-gray-700 hover:text-pink-600">Community</Link>
        <Link to="/childShop" className="text-gray-700 hover:text-pink-600">Baby Essentials</Link>
        <Link to="/drugCheck" className="text-gray-700 hover:text-pink-600">Drug Check</Link>
        <Link to="/audio-books" className="text-gray-700 hover:text-pink-600">Audio Books</Link>
            </nav>
            <div className="mt-6">
              <Button className="w-full bg-pink-500 hover:  bg-pink-600 text-white">
                Mother Care
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
