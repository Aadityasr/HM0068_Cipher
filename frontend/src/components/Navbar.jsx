import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-pink-100 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-pink-600">MotherCare</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        <a href="#" className="text-gray-700 hover:text-pink-600">Home</a>
        <a href="#" className="text-gray-700 hover:text-pink-600">Pregnancy Tips</a>
        <a href="#" className="text-gray-700 hover:text-pink-600">Doctors</a>
        <a href="#" className="text-gray-700 hover:text-pink-600">Contact</a>
      </div>

      {/* Call to Action */}
      <div className="hidden md:block">
        <Button className="bg-pink-500 hover:bg-pink-600 text-white">Login</Button>
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
              <a href="#" className="text-gray-700 hover:text-pink-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Pregnancy Tips</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Doctors</a>
              <a href="#" className="text-gray-700 hover:text-pink-600">Contact</a>
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
