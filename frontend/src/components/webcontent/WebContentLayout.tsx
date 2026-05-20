import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import {
  ShoppingBag,
  Layers,
  ArrowRight,
  Layout,
  Users,
  Hammer,
  Mail,
  Package,
} from "lucide-react";

import { publishContent } from "@/api/publishContent";
import ContentNav from "./ContentNav";
import { useToast } from "@/hooks/useToast";
import { useApiState } from "@/hooks/useApiState";

import ToastContainer from "../admin/common/ToastComponent";
import LoadingOverlay from "../admin/common/LoadingOverlay";

function WebContentLayout() {
  const location = useLocation();

  // Routes where sidebar should be hidden
  const hideSidebarRoutes = [
    "/content/view-products",
    "/content/add-product",
  ];

  const shouldShowSidebar =
    location.pathname !== "/content" &&
    !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navbar */}
      <ContentNav />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">

          {/* Dashboard Cards */}
          <NavigationCards />

          {/* Page Content */}
          <div className="w-full flex flex-col md:flex-row gap-5">

            {/* Sidebar */}
            {shouldShowSidebar && <PageSideNav />}

            {/* Main Outlet */}
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default WebContentLayout;


/* -------------------------------------------------------------------------- */
/*                                DASHBOARD UI                                */
/* -------------------------------------------------------------------------- */

export const NavigationCards = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== "/content") return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Content Management Dashboard
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Select a workspace below to manage storefront assets,
          layouts, products, and content sections.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Web Content Card */}
        <div
          onClick={() => navigate("/content/homepage")}
          className="
            group relative flex flex-col justify-between
            p-6 bg-white border border-slate-200/80 rounded-2xl
            shadow-sm hover:border-[#3CBDE6]
            hover:shadow-md transition-all duration-200
            cursor-pointer active:scale-[0.99]
          "
        >
          <div className="flex items-start justify-between">

            <div className="space-y-4">
              <div
                className="
                  p-3 w-12 h-12 bg-slate-50
                  group-hover:bg-[#3CBDE6]/10
                  rounded-xl text-slate-500
                  group-hover:text-[#3CBDE6]
                  transition-colors flex items-center justify-center
                "
              >
                <Layers size={22} />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 group-hover:text-[#3CBDE6]">
                  Web Pages & Layouts
                </h3>

                <p className="text-xs text-slate-500 mt-1 max-w-[280px]">
                  Modify homepage sections, banners,
                  copywriting, and landing layouts.
                </p>
              </div>
            </div>

            <div className="text-slate-300 group-hover:text-[#3CBDE6] group-hover:translate-x-1 transition-all">
              <ArrowRight size={18} />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Live Editor Workspace
            </span>
          </div>
        </div>

        {/* Product Card */}
        <div
          onClick={() => navigate("/content/view-products")}
          className="
            group relative flex flex-col justify-between
            p-6 bg-white border border-slate-200/80 rounded-2xl
            shadow-sm hover:border-[#3CBDE6]
            hover:shadow-md transition-all duration-200
            cursor-pointer active:scale-[0.99]
          "
        >
          <div className="flex items-start justify-between">

            <div className="space-y-4">
              <div
                className="
                  p-3 w-12 h-12 bg-slate-50
                  group-hover:bg-[#3CBDE6]/10
                  rounded-xl text-slate-500
                  group-hover:text-[#3CBDE6]
                  transition-colors flex items-center justify-center
                "
              >
                <ShoppingBag size={22} />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 group-hover:text-[#3CBDE6]">
                  Product Inventory
                </h3>

                <p className="text-xs text-slate-500 mt-1 max-w-[280px]">
                  Update product details, features,
                  pricing, and marketing assets.
                </p>
              </div>
            </div>

            <div className="text-slate-300 group-hover:text-[#3CBDE6] group-hover:translate-x-1 transition-all">
              <ArrowRight size={18} />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3CBDE6]"></span>

            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Catalog Database
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};


/* -------------------------------------------------------------------------- */
/*                                  SIDEBAR                                   */
/* -------------------------------------------------------------------------- */

interface NavPage {
  name: string;
  path: string;
  icon: React.ElementType;
}

const pages: NavPage[] = [
  { name: "Homepage", path: "/content/homepage", icon: Layout },
  { name: "Who We Are", path: "/content/whoweare", icon: Users },
  { name: "What We Do", path: "/content/whatwedo", icon: Hammer },
  { name: "Contact Us", path: "/content/contacts", icon: Mail },
  { name: "Products", path: "/content/prod", icon: Package },
];

export const PageSideNav = () => {
  const location = useLocation();

  const { toasts, addToast } = useToast();
  const apiState = useApiState();

  const handlePublish = async () => {
    try {
      apiState.startLoading();

      const response = await publishContent();

      if (!response) return;

      addToast("Published Successfully", "success");

    } catch (error) {
      console.error(error);
      addToast("Failed to publish", "error");

    } finally {
      apiState.reset();
    }
  };

  return (
    <aside
      className="
        w-full md:w-64 shrink-0
        bg-white rounded-xl
        border border-slate-200/80
        p-3 md:p-4
        h-fit sticky top-20
      "
    >

      {/* Label */}
      <p className="hidden md:block px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
        Core Channels
      </p>

      {/* Navigation */}
      <ul className="flex md:flex-col gap-2 w-max md:w-full m-0 p-0 list-none">

        {pages.map((page) => {
          const isActive = location.pathname === page.path;
          const Icon = page.icon;

          return (
            <li key={page.path} className="w-auto md:w-full shrink-0">

              <Link
                to={page.path}
                className={`
                  group relative flex items-center gap-3
                  px-4 py-3 rounded-xl
                  text-sm font-semibold
                  whitespace-nowrap transition-all duration-200
                  ${
                    isActive
                      ? "text-[#3CBDE6] bg-[#3CBDE6]/5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }
                `}
              >

                {/* Active Indicator */}
                {isActive && (
                  <span className="hidden md:block absolute left-0 top-3 bottom-3 w-1 bg-[#3CBDE6] rounded-r-md" />
                )}

                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-[#3CBDE6]"
                      : "text-slate-400 group-hover:text-slate-600"
                  }
                />

                <span>{page.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Publish Button */}
      <div className="w-full mt-8">
        <button
          onClick={handlePublish}
          className="
            w-full bg-green-600 hover:bg-green-500
            transition-all duration-300
            font-bold text-white p-3 rounded-xl
          "
        >
          Publish
        </button>
      </div>

      {/* Loading */}
      {apiState.status === "loading" && <LoadingOverlay />}

      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </aside>
  );
};