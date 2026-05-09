import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { Layout, Users, Hammer, Mail, Package, ShieldCheck } from 'lucide-react';

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
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="w-full flex items-center justify-between px-6 h-16"
      >
        {/* Branding Area */}
        <div className="cursor-pointer flex items-center gap-2"
          onClick={()=> window.location.href = '/content'}

        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Opsie <span className="font-light text-slate-400">CMS</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-row items-center h-full">
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

        <button className='bg-blue-300 p-3' onClick={()=> window.location.href = "/admin"}>Back to Dashboard</button>

        
      </div>
    </nav>
  );
};

export default ContentNav;