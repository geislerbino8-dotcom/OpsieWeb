import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import logo from "../assets/opsie/opsie_logo.png";
import PrimaryButton from "./buttons/PrimaryButton";
import MobileMenu from "./MobileMenu";
import burgermenu from "../assets/icons/burger-bar.png";
import { products } from "@/data/productsData";


const menuLists = [
  { name: "Why Opsie", link: "/what-we-do" },
  { name: "About Us", link: "/who-we-are" },
  { name: "Contact Us", link: "/contact-us" },
  { name: "Products", link: "/products" },
];

function DateTimeDisplay() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="hidden lg:flex items-center gap-1.5 text-white/70 text-[10px] font-medium px-2 py-1 rounded-md border border-white/10 bg-white/5">
      <Clock className="w-3 h-3 text-[#8B5CF6]" />
      <div className="flex flex-col leading-tight">
        <span className="font-mono">{time}</span>
        <span className="text-white/40 text-[9px]">{date}</span>
      </div>
    </div>
  );
}


function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navIsOpen, setNavIsOpen] = useState(false);
const [isProductsHover, setIsProductsHover] = useState(false);

  // /book-a-schedule is a full dark surface; on that route the nav goes
  // translucent black (per the design) instead of the purple used elsewhere.
  const isDarkNav = location.pathname === "/book-a-schedule";

  const toggleMobileNav = () => setNavIsOpen(!navIsOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 860) {
        setNavIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setShowNav(false);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        hideTimeout.current = setTimeout(() => setShowNav(true), 1000);
      } else {
        setShowNav(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [lastScroll]);

  return (
    <>
      <nav
      className="
      bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 
      w-full fixed left-0 z-20"
      style={{
        top: showNav ? 0 : "-80px",
        transition: "top 0.3s",
        backgroundColor: isDarkNav ? "rgba(10, 10, 10, 0.82)" : "#4C1D95"
      }}
    >
      {/* Desktop */}
      <div className="md:flex flex-col max-w-7xl max-[865px]:hidden mx-auto py-1 px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="cursor-pointer" aria-label="Opsie Home">
            <img src={logo} alt="Opsie Logo" className="w-32" />
          </Link>

          {/* Menu */}
          <ul className="flex px-6 py-2 text-white relative">
            {menuLists.map((item) => {
              const isProducts = item.name === "Products";

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

                          absolute top-full left-0 w-56 shadow-xl p-2 bg-white
                          transition-all duration-100 ease-out
                        "
                      >
                        {products.map((prod: { name: string }) => (
                          <Link
                            key={prod.name}
                            to={`/products/${prod.name}`}
                            className="text-black cursor-pointer block px-2 py-2 text-sm
                            hover:bg-blue-50 hover:text-[#8B5CF6] transition"
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

          {/* Date/Time Display */}
          <DateTimeDisplay />

          {/* Button */}
          <PrimaryButton text="Get Started" variant="primary" onClick={()=> {
            navigate("/book-a-schedule")
          }}/>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between px-6 py-4 md:hidden">
        <Link to="/" className="cursor-pointer" aria-label="Opsie Home">
          <img src={logo} alt="Opsie Logo" className="w-24" />
        </Link>

        <button onClick={toggleMobileNav} aria-label="Toggle menu" aria-expanded={navIsOpen}>
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