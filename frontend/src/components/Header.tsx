import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/Button/Button";

export default function Header() {
  
  
  const baseStyle =
    "px-4 py-3 rounded-full transition font-medium text-black shadow-[rgba(0,0,0,0.25)_0px_4px_4px_0px]";

  const baseShadow = { boxShadow: 'rgba(0,0,0,0.25) 0px 4px 4px 0px' };

  
  const navItems = [
    { name: "What we do", path: "/whatWeDo" },
    { name: "Who We Are", path: "/whoWeAre" },
    { name: "Contact Us", path: "/contact" },
    { name: "Products", path: "/products" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full relative z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 pt-2 pb-1">
        {/* Logo */}
        <div className="text-xl flex items-start justify-start">
          <img src="/Opsie-Logo.svg" alt="Opsie Logo"/>
        </div>

        {/* Navigation */}
        <ul
          className=" flex-row gap-10 list-none py-2.5 hidden md:flex"
          style={{
            backgroundColor: "rgb(240, 242, 245)",
            borderRadius: "50px",
            boxShadow:
              "rgba(60, 189, 230, 0.25) 2px 3px 4px 0px inset , rgba(250, 251, 255, 1) -2px -2px 4px 0px inset",
          }}
        >
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                style={({ isActive }) => isActive ? { ...baseShadow } : {}}
                    className={({ isActive }) =>
                      `${baseStyle} ${
                        isActive
                          ? "bg-[#3CBDE6] text-white font-bold"
                          : "hover:bg-[#3CBDE6] hover:text-white"
                      }`
                }
              >
                {item.name}
              </NavLink>
              <a href=""></a>
            </li>
          ))}
        </ul>

        {/* Button */}
        <div className="hidden md:flex flex-row bg-[#3CBDE6] py-1  px-4  rounded-3xl text-white  transition">

        <Button
              label="Get Started"
              icon={<img src="/ICONS/get-started-arrow.svg" className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => alert("Button clicked!")}
            />
       
        </div>

        <button onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] group"
          >
            <img src="/ICONS/menu-icon.svg" alt="" />
          </button>
       
      </div>
    </header>
  );
}