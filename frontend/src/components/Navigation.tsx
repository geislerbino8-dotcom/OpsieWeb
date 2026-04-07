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

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setShowNav(false);
        setTimeout(()=> {
          setShowNav(true)
        }, 1000)
      } else {
        setShowNav(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
    
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
        backgroundColor: '#0F4C5C'
      }}
    >
      {/* Desktop */}
      <div className="md:flex flex-col max-w-7xl max-[865px]:hidden mx-auto py-1 px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="cursor-pointer" onClick={directToHome}>
            <img src={logo} alt="Opsie Logo" className="w-32" />
          </div>

          {/* Menu */}
          <ul className="flex px-6 py-2 text-white relative">
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
                      className={`block px-4 py-2 rounded-3xl transition-colors duration-200
                         hover:text-[#3CDBE6] 
                        ${location.pathname === item.link ? "font-bold text-[#3CDBE6]" : ""}
                      `}
                    >
                      {item.name}
                    </Link>

                    {/* Dropdown */}
                    {isProductsHover && (
                      <aside
                        className="

                          absolute top-full left-0 w-56 shadow-xl p-2 bg-white
                          transition-all duration-100 ease-out
                        "
                      >
                        {products.map((prod, i) => (
                          <a
                            onClick={()=> navigate(`/products/${prod.name}`)}
                            key={i}
                            className="text-black cursor-pointer block px-2 py-2 text-sm
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
                    className={`block px-4 py-2 rounded-3xl transition-colors duration-200
                    hover:text-[#3CBDE6]
                    ${
                      location.pathname === item.link
                        ? "font-bold text-[#3CBDE6]"
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
          <PrimaryButton text="Get Started" variant="primary" onClick={()=> {
            navigate("/book-a-schedule")
          }}/>
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
     
    </nav>
    {navIsOpen ? <MobileMenu closeMenu={toggleMobileNav}/> : null}
    </>
    
  );
}

export default Navigation;