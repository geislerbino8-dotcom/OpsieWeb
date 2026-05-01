import ContentNav from "./ContentNav"
import { Outlet } from "react-router-dom"

function WebContentFrom() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ContentNav />
      <div className="flex flex-row w-full h-screen">
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
      </div>
      
    </div>
  )
}

export default WebContentFrom
