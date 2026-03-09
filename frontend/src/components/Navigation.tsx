import React, { useState, useEffect } from "react";
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

  // Auto close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent">

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto py-4 px-6">
        {/* Logo */}
        <div className="cursor-pointer" onClick={directToHome}>
          <img src={logo} alt="Opsie Logo" className="w-32" />
        </div>

        {/* Menu Links */}
        <ul className="font-poppins flex space-x-4 bg-white rounded-3xl px-6 py-2 text-black"
          style={{
             boxShadow: "rgba(60, 189, 230, 0.25) 2px 3px 4px 0px inset , rgba(250, 251, 255, 1) -2px -2px 4px 0px inset"
          }}
        >
          {menuLists.map((item, index) => (
            <li
              key={index}
              className="rounded-3xl transition-colors duration-200 hover:bg-[#3CBDE6] hover:text-white"
            >
              <Link
                to={item.link}
                className={`block px-4 py-2 font-medium ${
                  location.pathname === item.link
                    ? "rounded-3xl bg-[#3CBDE6] text-white"
                    : ""
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

      {/* Mobile Navigation (Burger Menu) */}
      {/** Only visible below md (mobile) */}
      <div className="flex items-center justify-between px-6 py-4 md:hidden">
        {/* Mobile Logo */}
        <div className="cursor-pointer md:hidden" onClick={directToHome}>
          <img src={logo} alt="Opsie Logo" className="w-24" />
        </div>

        {/* Hamburger Menu */}
        <button onClick={toggleMobileNav} className="focus:outline-none md:hidden">
          <img src={burgermenu} alt="Menu" className="w-8" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {navIsOpen && <MobileMenu closeMenu={() => setNavIsOpen(false)} />}
    </nav>
  );
}

export default Navigation;