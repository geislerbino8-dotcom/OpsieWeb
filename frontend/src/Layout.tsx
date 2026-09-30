import ChatHelp from "./components/ChatHelp"
import Navigation from "./components/Navigation"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"


function Layout() {


  return (
    <div>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#8B5CF6] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>
      <div className='select-none'>
          <ChatHelp />
          <Navigation />
          <main id="main-content" tabIndex={-1}>
            <Outlet />
          </main>
          <Footer/>
      </div>
    </div>
  )
}

export default Layout
