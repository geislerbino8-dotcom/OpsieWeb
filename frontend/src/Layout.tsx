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
              className="fixed left-0 right-0 top-[76px] z-30 bg-amber-100 px-4 py-3 text-center text-sm text-amber-950 shadow-md"
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
