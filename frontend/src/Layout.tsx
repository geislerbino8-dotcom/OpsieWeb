import ChatHelp from "./components/ChatHelp"
import Navigation from "./components/Navigation"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"


function Layout() {


  return (
    <div>
      <div className=''>
          <ChatHelp />
          <Navigation />
          <Outlet />
          <Footer/>
      </div>
    </div>
  )
}

export default Layout
