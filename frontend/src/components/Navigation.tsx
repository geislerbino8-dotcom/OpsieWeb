import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/opsie/opsie_logo.png";
import PrimaryButton from "./buttons/PrimaryButton";
import MobileMenu from "./MobileMenu";
import burgermenu from "../assets/icons/burger-bar.png";

const menuLists = [
  { name: "What We Do", link: "/what-we-do" },
  { name: "Who We Are", link: "/who-we-are" },
  { name: "Contact Us", link: "/contact-us" },
  { name: "Products", link: "/products" },
];

const products = [
  { name: "Opsie HRIS", link: "opsie-hris" },
  { name: "Opsync", link: "opsync" },
  { name: "Opsync Pro", link: "opsync-pro" },
  { name: "Opsync Cloud", link: "opsync-cloud" },
  { name: "Opsync Lite", link: "opsync-lite" },
  { name: "Opsie Web", link: "opsie-web" },
];

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navIsOpen, setNavIsOpen] = useState(false);
const [isProductsHover, setIsProductsHover] = useState(false);

  const toggleMobileNav = () => setNavIsOpen(!navIsOpen);

  const directToHome = () => {
    navigate("/");
    setNavIsOpen(false);
  };

  // Auto close mobile menu when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide/show nav on scroll
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      className="w-full fixed left-0 z-50"
      style={{
        top: showNav ? 0 : "-80px",
        transition: "top 0.3s",
      }}
    >
      {/* Desktop */}
      <div className="hidden md:flex flex-col max-w-7xl mx-auto py-4 px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="cursor-pointer" onClick={directToHome}>
            <img src={logo} alt="Opsie Logo" className="w-32" />
          </div>

          {/* Menu */}
          <ul className="font-poppins flex bg-white rounded-4xl px-6 py-2 text-black relative shadow-inner">
            {menuLists.map((item, index) => {
              const isProducts = item.name === "Products";

              if (isProducts) {
                return (
                  <li
                    key={index}
                    className="relative"
                    onMouseEnter={() => setIsProductsHover(true)}
                    onMouseLeave={() => setIsProductsHover(false)}
                  >
                    {/* Trigger */}
                    <Link
                      to={item.link}
                      className={`block px-4 py-2 rounded-3xl font-medium transition-colors duration-200
                        hover:bg-[#3CBDE6] hover:text-white
                        ${location.pathname === item.link ? "bg-[#3CBDE6] text-white" : ""}
                      `}
                    >
                      {item.name}
                    </Link>

                    {/* Dropdown */}
                    {isProductsHover && (
                      <aside
                        className="
                          absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl p-4
                          transition-all duration-300 ease-out
                        "
                      >
                        {products.map((prod, i) => (
                          <a
                            key={i}
                            href={`/products/${prod.name}`}
                            className="block px-3 py-2 rounded-lg text-sm
                            hover:bg-blue-50 hover:text-[#3CBDE6] transition"
                          >
                            {prod.name}
                          </a>
                        ))}
                      </aside>
                    )}
                  </li>
                );
              }

              return (
                <li key={index}>
                  <Link
                    to={item.link}
                    className={`block px-4 py-2 rounded-3xl font-medium transition-colors duration-200
                    hover:bg-[#3CBDE6] hover:text-white
                    ${
                      location.pathname === item.link
                        ? "bg-[#3CBDE6] text-white"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Button */}
          <PrimaryButton text="Get Started" variant="primary" />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between px-6 py-4 md:hidden">
        <div className="cursor-pointer" onClick={directToHome}>
          <img src={logo} alt="Opsie Logo" className="w-24" />
        </div>

        <button onClick={toggleMobileNav}>
          <img src={burgermenu} alt="Menu" className="w-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      {navIsOpen && <MobileMenu closeMenu={() => setNavIsOpen(false)} />}
    </nav>
  );
}

export default Navigation;