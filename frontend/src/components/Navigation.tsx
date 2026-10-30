import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/opsie/opsie_logo.png";
import MobileMenu from "./MobileMenu";
import { navigationMenus, type NavigationLink } from "./navigationData";
import { products } from "@/data/productsData";

type NavigationProduct = {
  name: string;
  description?: string;
};

type NavbarTheme = "dark" | "light";

const productLinks: NavigationLink[] = [
  ...(products as NavigationProduct[]).map((product, index) => ({
    label: product.name,
    description: product.description ?? "Explore this Opsie solution.",
    path: `/products/${encodeURIComponent(product.name)}`,
    tone: index % 2 === 0 ? ("dark" as const) : ("teal" as const),
  })),
  {
    label: "Explore all products",
    description: "See the full collection of Opsie products.",
    path: "/products",
    tone: "teal",
  },
];

const menuContent: Record<
  string,
  { heading: string; description: string; path: string; links: NavigationLink[] }
> = {
  ...Object.fromEntries(
    navigationMenus.map((item) => [
      item.label,
      {
        heading: item.heading,
        description: item.description,
        path: item.path,
        links: item.links,
      },
    ]),
  ),
  Products: {
    heading: "Built for better operations.",
    description:
      "Explore software designed to make your team’s work simpler and more connected.",
    path: "/products",
    links: productLinks,
  },
};

const navItems = [
  ...navigationMenus.map(({ label, path }) => ({ label, path })),
  { label: "Products", path: "/products" },
];

function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<NavbarTheme>(() =>
    localStorage.getItem("opsie-navbar-theme") === "light" ? "light" : "dark",
  );
  const [showNav, setShowNav] = useState(true);
  const lastScroll = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && currentScroll > 120) {
        setShowNav(false);
        setOpenMenu(null);

        if (hideTimer.current) {
          clearTimeout(hideTimer.current);
        }

        hideTimer.current = setTimeout(() => setShowNav(true), 1000);
      } else {
        setShowNav(true);
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, []);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("opsie-navbar-theme", nextTheme);
    setTheme(nextTheme);
  };
  const isDark = theme === "dark";

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-40 w-full border-b shadow-[0_8px_30px_rgba(4,12,30,0.18)] transition-transform duration-300 ${
          isDark
            ? "border-white/10 bg-[#0B1220] text-white"
            : "border-slate-200 bg-white text-[#0B1220]"
        } ${showNav ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav
          aria-label="Main navigation"
          className="relative mx-auto flex h-20 w-full items-center justify-between gap-3 px-6 sm:px-8"
        >
          <Link
            to="/"
            aria-label="Opsie home"
            className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00C0E8]"
          >
            <img src={logo} alt="Opsie" className="w-[70px]" />
          </Link>

          <div className="hidden items-center gap-3 md:flex lg:gap-8">
            {navItems.map((item) => {
              const isOpen = openMenu === item.label;
              const content = menuContent[item.label];

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onFocus={() => setOpenMenu(item.label)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpenMenu(null);
                    }
                  }}
                  onBlur={(event) => {
                    const nextTarget = event.relatedTarget;
                    if (
                      !(nextTarget instanceof Node) ||
                      !event.currentTarget.contains(nextTarget)
                    ) {
                      setOpenMenu(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`navigation-menu-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00C0E8] lg:gap-2 lg:text-sm ${
                      isOpen || isActive(item.path)
                        ? "text-[#00C0E8]"
                        : isDark
                          ? "text-slate-200 hover:text-[#00C0E8]"
                          : "text-slate-700 hover:text-[#00C0E8]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`navigation-menu-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                      className="absolute left-1/2 top-full z-50 w-[min(94vw,920px)] -translate-x-1/2 pt-3"
                    >
                      <div
                        className={`grid gap-5 rounded-2xl border p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:grid-cols-[0.8fr_1.7fr] md:gap-7 md:p-7 ${
                          isDark
                            ? "border-[#1F2937] bg-[#0B1220]"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div
                          className={`flex flex-col items-start border-b pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-7 ${
                            isDark
                              ? "border-[#1F2937]"
                              : "border-slate-200"
                          }`}
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00C0E8]">
                            {item.label}
                          </p>
                          <h2
                            className={`mt-3 text-xl font-semibold tracking-tight lg:text-2xl ${
                              isDark ? "text-white" : "text-[#0B1220]"
                            }`}
                          >
                            {content.heading}
                          </h2>
                          <p
                            className={`mt-3 text-sm leading-6 ${
                              isDark ? "text-slate-300" : "text-slate-600"
                            }`}
                          >
                            {content.description}
                          </p>
                          <Link
                            to={content.path}
                            onClick={() => setOpenMenu(null)}
                            className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#00C0E8] transition-colors hover:opacity-75"
                          >
                            Explore {item.label.toLowerCase()}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-4 w-4"
                            />
                          </Link>
                        </div>

                        <div
                          className={`grid content-start gap-2 ${
                            item.label === "Products"
                              ? "sm:grid-cols-2"
                              : "sm:grid-cols-2"
                          }`}
                        >
                          {content.links.map((link) => (
                            <Link
                              key={link.label}
                              to={link.path}
                              onClick={() => setOpenMenu(null)}
                              className={`group flex min-h-24 flex-col justify-between rounded-xl p-4 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C0E8] ${
                                link.tone === "teal"
                                  ? "bg-[#00C0E8] text-[#0B1220]"
                                  : "bg-[#0B1220] text-white"
                              }`}
                            >
                              <span className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold">
                                  {link.label}
                                </span>
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
                                />
                              </span>
                              <span
                                className={`mt-2 text-xs leading-5 ${
                                  link.tone === "teal"
                                    ? "text-[#0B1220]/75"
                                    : "text-slate-300"
                                }`}
                              >
                                {link.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0 md:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} navbar`}
              title={`Switch to ${isDark ? "light" : "dark"} navbar`}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C0E8] ${
                isDark
                  ? "text-slate-300 hover:bg-white/10 hover:text-[#00C0E8]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#00C0E8]"
              }`}
            >
              {isDark ? (
                <Moon aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Sun aria-hidden="true" className="h-4 w-4" />
              )}
            </button>

            <Link
              to="/book-a-schedule"
              className="hidden items-center justify-center whitespace-nowrap rounded-md bg-[#00C0E8] px-3 py-2 text-xs font-semibold text-[#0B1220] transition-colors hover:bg-[#36d2f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00C0E8] sm:inline-flex lg:px-4 lg:text-sm"
            >
              Get started
            </Link>

            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C0E8] md:hidden ${
                isDark
                  ? "border-white/15 text-white hover:border-[#00C0E8] hover:text-[#00C0E8]"
                  : "border-slate-300 text-[#0B1220] hover:border-[#00C0E8] hover:text-[#00C0E8]"
              }`}
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <MobileMenu
          closeMenu={closeMobileMenu}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
    </>
  );
}

export default Navigation;
