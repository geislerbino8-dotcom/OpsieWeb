import React, { useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { Layout, Users, Hammer, Mail, Package, ShieldCheck, Menu, X } from 'lucide-react';

interface NavPage {
  name: string;
  path: string;
  icon: React.ElementType;
}

const pages: NavPage[] = [
  { name: "Homepage", path: '/content/homepage', icon: Layout },
  { name: "Who We Are", path: '/content/whoweare', icon: Users },
  { name: "What We Do", path: '/content/whatwedo', icon: Hammer },
  { name: "Contact Us", path: '/content/contacts', icon: Mail },
  { name: "Products", path: '/content/products', icon: Package },
];

const ContentNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="w-full flex items-center justify-between px-4 md:px-6 h-16">
        
        {/* Branding Area */}
        <div 
          className="cursor-pointer flex items-center gap-2 z-50"
          onClick={() => window.location.href = '/content'}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Opsie <span className="font-light text-slate-400">CMS</span>
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex flex-row items-center h-full">
          {pages.map((page) => {
            const isActive = location.pathname === page.path;
            const Icon = page.icon;

            return (
              <li key={page.path} className="h-full">
                <Link
                  to={page.path}
                  className={`
                    flex items-center gap-2 px-5 h-full text-sm font-medium transition-all duration-200 border-b-2
                    ${isActive 
                      ? "text-blue-600 border-blue-600 bg-blue-50/30" 
                      : "text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-50/80"
                    }
                  `}
                >
                  <Icon 
                    size={18} 
                    className={`transition-colors ${isActive ? "text-blue-600" : "text-slate-400"}`} 
                  />
                  {page.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:block">
            <button 
                className='bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md text-sm font-medium transition-colors' 
                onClick={() => window.location.href = "/admin"}
            >
                Back to Dashboard
            </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`
        fixed inset-0 top-16 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex flex-col p-4 gap-2">
          { location.pathname === '/homepage'  && pages.map((page) => {
            const isActive = location.pathname === page.path;
            const Icon = page.icon;

            return (
              <Link
                key={page.path}
                to={page.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-4 p-4 rounded-xl text-base font-medium transition-all
                  ${isActive 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                <Icon size={20} />
                {page.name}
              </Link>
            );
          })}
          
          <hr className="my-4 border-slate-100" />
          
          <button 
            className='w-full bg-blue-600 text-white p-4 rounded-xl font-semibold shadow-lg shadow-blue-100' 
            onClick={() => window.location.href = "/admin"}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ContentNav;