"use client";
import { useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import SidebarNavbar from "./navbar/sidebar-navbar";

const NavbarView = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      {/* Top Navbar */}
      <header className="relative flex items-center justify-between bg-white p-4 shadow-md">
        <Link href="/home" className="text-xl font-bold text-orange-500">
          KasirKu
        </Link>

        {/* Hamburger menu */}
        <button onClick={toggleSidebar} className="lg:hidden">
          <RxHamburgerMenu size={24} />
        </button>
      </header>

      {/* Sidebar */}
      <SidebarNavbar setIsOpen={setIsOpen} isOpen={isOpen} />

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}
    </div>
  );
};

export default NavbarView;
