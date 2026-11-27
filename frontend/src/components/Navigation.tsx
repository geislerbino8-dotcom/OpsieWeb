import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import lightLogo from "/figma/opsie-logo-light.png";
import darkLogo from "/figma/opsie-logo-dark.png";
import PrimaryButton from "./buttons/PrimaryButton";
import MobileMenu from "./MobileMenu";
import burgermenu from "../assets/icons/burger-bar.png";
import { products } from "@/data/productsData";


const menuLists = [
  { name: "Platform", link: "/what-we-do" },
  { name: "Company", link: "/who-we-are" },
  { name: "Contact", link: "/contact-us" },
  { name: "Solutions", link: "/products" },
];


function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [isProductsHover, setIsProductsHover] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Every page uses the booking page's nav treatment: a translucent
  // near-black bar (over backdrop-blur) instead of the old solid violet,
  // so the nav reads the same on dark and light surfaces alike.

  const toggleMobileNav = () => setNavIsOpen(!navIsOpen);

  // Close the sheet as soon as the layout flips to the desktop nav (md = 768px,
  // matching the `md:hidden`/`max-md:hidden` rules below — previously 860 left a
  // dead zone where an open sheet overlapped the desktop nav).
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Browser back/forward bypasses the menu link handlers, so close the sheet
  // whenever the route changes (state adjusted during render per React docs).
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    if (navIsOpen) setNavIsOpen(false);
  }

  // Prevent the page behind the fixed sheet from scrolling while it is open.
  useEffect(() => {
    if (!navIsOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navIsOpen]);

  // Scroll autohide removed 2026-10-19: desktop-review criterion D5 requires
  // the sticky header to remain visible at every scroll offset (2026-10-19
  // desktop audit decision — fix, not waive).

  return (
    <>
      <nav
      className={`w-full h-[76px] fixed left-0 top-0 z-20 transition-colors duration-300 ${
        isDarkMode ? "bg-[#101a22]" : "bg-[#f2fafd]"
      }`}
    >
      {/* Desktop */}
      <div className="md:flex flex-col max-w-7xl max-md:hidden mx-auto py-1 px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="cursor-pointer" aria-label="Opsie Home">
            <img src={isDarkMode ? darkLogo : lightLogo} alt="Opsie Logo" className="h-10 w-auto object-contain" />
          </Link>

          {/* Menu */}
          <ul className={`flex px-6 py-2 relative ${isDarkMode ? "text-[#f0f7fb]" : "text-[#103a49]"}`}>
            {menuLists.map((item) => {
              const isProducts = item.name === "Solutions";

              if (isProducts) {
                return (
                  <li
                    key={item.link}
                    className="relative"
                    onMouseEnter={() => setIsProductsHover(true)}
                    onMouseLeave={() => setIsProductsHover(false)}
                  >
                    {/* Trigger */}
                    <Link
                      to={item.link}
                      aria-haspopup="true"
                      aria-expanded={isProductsHover}
                      className={`block px-4 py-2 rounded-3xl transition-colors duration-200
                         hover:text-[#8B5CF6]
                        ${location.pathname === item.link ? "font-bold text-[#8B5CF6] aria-current-page" : ""}
                      `}
                    >
                      {item.name}
                    </Link>

                    {/* Dropdown */}
                    {isProductsHover && (
                      <aside
                        aria-label="Product submenu"
                        className="

                          absolute top-full left-0 w-56 shadow-xl p-2 bg-[#0f0f15] border border-white/10
                          transition-all duration-100 ease-out
                        "
                      >
                        {products.map((prod: { name: string }) => (
                          <Link
                            key={prod.name}
                            to={`/products/${prod.name}`}
                            className="text-gray-100 cursor-pointer block px-2 py-2 text-sm
                            hover:bg-[#8B5CF6]/15 hover:text-[#8B5CF6] transition"
                          >
                            {prod.name}
                          </Link>
                        ))}
                      </aside>
                    )}
                  </li>
                );
              }
              
              return (
                <li key={item.link}>
                  <Link
                    to={item.link}
                    className={`block px-4 py-2 rounded-3xl transition-colors duration-200
                    hover:text-[#8B5CF6]
                    ${
                      location.pathname === item.link
                        ? "font-bold text-[#8B5CF6] aria-current-page"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <button
              type="button"
              role="switch"
              aria-label="Toggle color mode"
              aria-checked={isDarkMode}
              onClick={() => setIsDarkMode((value) => !value)}
              className={`relative h-[26px] w-[58px] rounded-full transition-colors ${
                isDarkMode ? "bg-[#263f4c]" : "bg-[#d6e7ed]"
              }`}
            >
              <span
                className={`absolute top-[2px] size-[22px] rounded-full bg-[#fffdf5] shadow-sm transition-all ${
                  isDarkMode ? "left-[34px]" : "left-[2px]"
                }`}
              />
              <Sun className={`absolute left-[6px] top-[6px] size-[14px] ${isDarkMode ? "text-[#a5bac7]" : "text-[#103a49]"}`} />
              <Moon className={`absolute right-[6px] top-[6px] size-[14px] ${isDarkMode ? "text-[#103a49]" : "text-[#506d78]"}`} />
            </button>
            <PrimaryButton
              text="Get started"
              variant="primary"
              className="h-[42px] min-w-[158px] rounded-full !bg-[#3cbde7] !text-[#062e3b] !font-medium hover:!bg-[#62cced]"
              onClick={() => navigate("/book-a-schedule")}
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between px-6 py-4 md:hidden">
        <Link to="/" className="cursor-pointer" aria-label="Opsie Home">
          <img src={isDarkMode ? darkLogo : lightLogo} alt="Opsie Logo" className="h-9 w-auto object-contain" />
        </Link>

        {/* p-1.5 grows the hit area to 44px; -m-1.5 keeps the icon in place */}
        <button
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
          aria-expanded={navIsOpen}
          className="-m-1.5 p-1.5"
        >
          <img src={burgermenu} alt="Menu" className="w-8" />
        </button>
      </div>

      {/* Mobile Menu */}
     
    </nav>
    {navIsOpen ? <MobileMenu closeMenu={toggleMobileNav}/> : null}
    </>
    
  );
}

export default Navigation;