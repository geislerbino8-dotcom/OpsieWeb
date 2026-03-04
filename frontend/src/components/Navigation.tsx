import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/opsie/opsie_logo.png";
import PrimaryButton from "./buttons/PrimaryButton";
import upArrow from "../assets/opsie/up-right-arrow.png";
import MobileMenu from "./MobileMenu";
import burgermenu from "../assets/icons/bars-solid.png";

const menuLists = [
  { name: "What We Do", link: "/what-we-do" },
  { name: "Who We Are", link: "/who-we-are" },
  { name: "Contact Us", link: "/contact-us" },
  { name: "Products", link: "/products" },
];

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleMobileNav = () => setNavIsOpen(!navIsOpen);
  const directToHome = () => {
    navigate("/");
    setNavIsOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent">
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto py-4 px-6">
        {/* Desktop Logo */}
        <div className="cursor-pointer" onClick={directToHome}>
          <img src={logo} alt="Opsie Logo" className="w-32" />
        </div>

        {/* Desktop Menu Links */}
      {/* Desktop Menu Links */}
<ul className="flex space-x-4 bg-white rounded-3xl px-6 py-2 text-black">
  {menuLists.map((item, index) => (
    <li
      key={index}
      className="rounded-4xl transition-colors duration-200 hover:bg-[#3CBDE6] hover:text-white"
    >
      <Link
        to={item.link}
        className={`block px-4 py-2 font-medium ${
          location.pathname === item.link ? "rounded-3xl bg-[#3CBDE6] text-white" : ""
        }`}
      >
        {item.name}
      </Link>
    </li>
  ))}
</ul>

        {/* Get Started Button */}
        <PrimaryButton
          text="Get Started"
          color="#3CBDE6"
          fontSize="1"
          borderRadius="2"
          margin="0"
          padding="1"
          image={upArrow}
        />
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center justify-between px-6 py-4">
        {/* Mobile Logo */}
        <div className="cursor-pointer md:hidden" onClick={directToHome}>
          <img src={logo} alt="Opsie Logo" className="w-24" />
        </div>

        {/* Hamburger Menu */}
        <button onClick={toggleMobileNav} className="focus:outline-none">
          <img src={burgermenu} alt="Menu" className="w-8" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {navIsOpen && <MobileMenu closeMenu={() => setNavIsOpen(false)} />}
    </nav>
  );
}

export default Navigation;