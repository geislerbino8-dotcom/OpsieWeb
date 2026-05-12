import ContentNav from "./ContentNav"
import { Outlet, useLocation } from "react-router-dom"
import { useContext } from "react"
import { WebContentContext } from "./WebContentFrom"
import { useNavigate } from "react-router-dom";
import { Box } from "lucide-react"; // Matching your icon set

function WebContentLayout() {

    const content = useContext(WebContentContext)
  

const NavigationCards = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== '/content') return null;

  return (
    <button
      onClick={() => navigate('/content/view-products')}
      className="group flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-[#3CBDE6] hover:shadow-md transition-all active:scale-95"
    >
      <div className="p-2 bg-slate-50 group-hover:bg-[#3CBDE6]/10 rounded-lg text-slate-400 group-hover:text-[#3CBDE6] transition-colors">
        <Box size={20} />
      </div>
      <div className="text-left">
        <span className="block text-sm font-bold text-slate-800">Products</span>
        <span className="block text-[10px] text-slate-400 uppercase tracking-tight">Manage Inventory</span>
      </div>
    </button>
  );
};

    console.log(content)

  return (
    <div className="flex flex-col justify-center items-center">
      <ContentNav />
      <div className="flex flex-row w-full">  
        
        <Outlet />
        {
          /**
           * <div className="w-1/2 h-full bg-slate-100 p-12 overflow-y-auto">
          <iframe 
          src="/" // Points to the actual route in your app
          title="Live Preview"
          className="w-full h-full border-none"
        />
        </div>
           */
        }

        <div>
          {NavigationCards()}
        </div>
      </div>
      
    </div>
  )
}

export default WebContentLayout
