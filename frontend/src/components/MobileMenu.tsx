import React from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import upArrow from "../assets/opsie/up-right-arrow.png";

function MobileMenu({ closeMenu }: any) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeMenu}
      ></div>

      {/* Bottom Half Menu */}
      <div
        className="
          bg-[#3CBDE6]
          relative w-full max-w-full h-[75vh]
          text-white
          rounded-t-3xl
          shadow-xl
          flex flex-col p-6 space-y-8
          transform transition-transform duration-300
        "
      >
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="self-end text-white text-2xl font-bold focus:outline-none"
        >
          ×
        </button>

        {/* Menu Links */}
        <nav className="flex-1 flex flex-col justify-center">
          <ul className="flex flex-col justify-center space-y-6 text-lg font-semibold text-center">
            <li>
              <a
                href="/what-we-do"
                className="text-2xl hover:text-indigo-400"
                onClick={closeMenu}
              >
                What We Do
              </a>
            </li>
            <li>
              <a
                href="/who-we-are"
                className="text-2xl hover:text-indigo-400"
                onClick={closeMenu}
              >
                Who We Are
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="text-2xl hover:text-indigo-400"
                onClick={closeMenu}
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="text-2xl hover:text-indigo-400"
                onClick={closeMenu}
              >
                Products
              </a>
            </li>
          </ul>
        </nav>

        {/* Get Started Button */}
        
      </div>
    </div>
  );
}

export default MobileMenu;