import ChatHelp from "./components/ChatHelp"
import Navigation from "./components/Navigation"
import DateTimeBar from "./components/DateTimeBar"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"


function Layout() {


  return (
    <div>
      <div className='select-none'>
          <ChatHelp />
          <Navigation />
          <DateTimeBar />
          <Outlet />
          <Footer/>
      </div>
    </div>
  )
}

export default Layout
