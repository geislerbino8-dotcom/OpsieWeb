import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/opsie/opsie_logo.png";
import { navigationMenus, type NavigationLink } from "./navigationData";
import { products } from "@/data/productsData";

type MobileProduct = {
  name: string;
  description?: string;
};

type NavbarTheme = "dark" | "light";

type MobileMenuProps = {
  closeMenu: () => void;
  theme: NavbarTheme;
  onToggleTheme: () => void;
};

const productLinks: NavigationLink[] = [
  ...(products as MobileProduct[]).map((product, index) => ({
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

const mobileMenus = [
  ...navigationMenus,
  {
    label: "Products",
    path: "/products",
    heading: "Built for better operations.",
    description:
      "Explore software designed to make your team’s work simpler and more connected.",
    links: productLinks,
  },
];

function MobileMenu({
  closeMenu,
  theme,
  onToggleTheme,
}: MobileMenuProps) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu]);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm md:hidden"
    >
      <button
        type="button"
        aria-label="Dismiss navigation backdrop"
        onClick={closeMenu}
        className="absolute inset-0 h-full w-full cursor-default"
      />

      <div
        id="mobile-navigation"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col overflow-y-auto border-l px-6 pb-8 pt-5 shadow-2xl sm:px-8 ${
          isDark
            ? "border-[#1F2937] bg-[#0B1220] text-white"
            : "border-slate-200 bg-white text-[#0B1220]"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b pb-5 ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <Link to="/" onClick={closeMenu} aria-label="Opsie home">
            <img src={logo} alt="Opsie" className="w-[70px]" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} navbar`}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C0E8] ${
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
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors hover:border-[#00C0E8] hover:text-[#00C0E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C0E8] ${
                isDark
                  ? "border-white/15 text-slate-200"
                  : "border-slate-300 text-slate-700"
              }`}
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav aria-label="Mobile navigation" className="mt-5">
          <ul className="space-y-2">
            {mobileMenus.map((menu) => {
              const isOpen = openMenu === menu.label;
              const menuId = `mobile-menu-${menu.label.replaceAll(" ", "-").toLowerCase()}`;

              return (
                <li key={menu.label}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === menu.label ? null : menu.label,
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors ${
                      isOpen || isActive(menu.path)
                        ? "bg-[#0F172A] text-[#00C0E8]"
                        : isDark
                          ? "text-slate-200 hover:bg-white/[0.05] hover:text-white"
                          : "text-slate-700 hover:bg-slate-100 hover:text-[#0B1220]"
                    }`}
                  >
                    {menu.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div id={menuId} className="px-2 pb-2 pt-2">
                      <p
                        className={`px-2 text-sm font-semibold ${
                          isDark ? "text-white" : "text-[#0B1220]"
                        }`}
                      >
                        {menu.heading}
                      </p>
                      <p
                        className={`px-2 pb-2 pt-1 text-xs leading-5 ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {menu.description}
                      </p>
                      <ul className="space-y-2">
                        {menu.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              to={link.path}
                              onClick={closeMenu}
                              className={`group flex items-start justify-between gap-3 rounded-lg p-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C0E8] ${
                                link.tone === "teal"
                                  ? "bg-[#00C0E8] text-[#0B1220]"
                                  : "bg-[#0B1220] text-white"
                              }`}
                            >
                              <span>
                                <span className="block text-sm font-semibold">
                                  {link.label}
                                </span>
                                <span
                                  className={`mt-1 block text-xs leading-5 ${
                                    link.tone === "teal"
                                      ? "text-[#0B1220]/75"
                                      : "text-slate-300"
                                  }`}
                                >
                                  {link.description}
                                </span>
                              </span>
                              <ArrowUpRight
                                aria-hidden="true"
                                className="mt-0.5 h-4 w-4 shrink-0 opacity-70"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          to="/book-a-schedule"
          onClick={closeMenu}
          className="mt-auto inline-flex items-center justify-center rounded-md bg-[#00C0E8] px-5 py-3 text-base font-semibold text-[#0B1220] transition-colors hover:bg-[#36d2f2]"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}

export default MobileMenu;
