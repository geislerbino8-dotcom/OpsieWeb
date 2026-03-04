import React from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import upArrow from "../assets/opsie/up-right-arrow.png";

function MobileMenu({ closeMenu } : any) {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeMenu}
      ></div>

      {/* Sliding Menu (full width) */}
      <div className="relative ml-auto w-full max-w-full h-full bg-gray-900 text-white flex flex-col p-6 space-y-12 transition-transform duration-300 transform translate-x-0">
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="self-end text-white text-2xl font-bold focus:outline-none"
        >
          ×
        </button>

        {/* Menu Links */}
        <div className="flex fd-c ai-c jc-c">
            <ul className="flex flex-col space-y-6 text-lg font-semibold">
          <li>
            <a
              href="/what-we-do"
              className="hover:text-indigo-400"
              onClick={closeMenu}
            >
              What We Do
            </a>
          </li>
          <li>
            <a
              href="/who-we-are"
              className="hover:text-indigo-400"
              onClick={closeMenu}
            >
              Who We Are
            </a>
          </li>
          <li>
            <a
              href="/contact-us"
              className="hover:text-indigo-400"
              onClick={closeMenu}
            >
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="/products"
              className="hover:text-indigo-400"
              onClick={closeMenu}
            >
              Products
            </a>
          </li>
        </ul>

        </div>
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
    </div>
  );
}

export default MobileMenu;