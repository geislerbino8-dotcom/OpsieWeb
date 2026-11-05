import ChatHelp from "./components/ChatHelp"
import Navigation from "./components/Navigation"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import { productsLoadError } from "./data/productsData"


function Layout() {


  return (
    <div>
      <div className='select-none'>
          <ChatHelp />
          <Navigation />
          {productsLoadError && (
            <div
              role="alert"
              className="fixed left-0 right-0 top-[76px] z-30 min-w-0 break-words px-4 py-3 text-center text-sm leading-5 text-amber-950 shadow-md [overflow-wrap:anywhere]"
            >
              The product catalog is temporarily unavailable. Please try again
              later.
            </div>
          )}
          <Outlet />
          <Footer/>
      </div>
    </div>
  )
}

export default Layout
