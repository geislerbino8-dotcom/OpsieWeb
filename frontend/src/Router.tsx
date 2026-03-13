import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ProductPage from "./pages/ProductPage"
import WhoWeAre from "./pages/WhoWeAre"
import WhatWeDoPage from "./pages/WhatWeDoPage"
import ContactUsPage from "./pages/ContactUsPage"
import Homepage from "./pages/Homepage"
import ProductItemPage from "./pages/ProductItemPage"
import Admin from "./pages/Admin"
import WhatWeDo from "./pages/WhatWeDo"
import BookingPage from './components/BookingPage'
import TicketingSupportSystemPage from "./components/admin/pages/TicketingSupportSystemPage"
import UserManagementPage from "./components/admin/pages/UserManagementPage"
import LoginPage from "./components/admin/pages/LoginPage"


const token = localStorage.getItem('token')

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: '/products',
                element: <ProductPage />
            },

            {
                path: '/who-we-are',
                element: <WhoWeAre />
            },

            {
                path: '/what-we-do',
                element: <WhatWeDo />
            },

            {
                path: '/contact-us',
                element: <ContactUsPage />
            },
            {
                path: '/products/:id',
                element: <ProductItemPage />
            },

            {
                path: '/book-a-schedule',
                element: <BookingPage />
            },

            {
                path: '/buy-now',
                element: <ProductPage/>
            },

            {
                path: '/buy-now',
                element: <ProductPage/>
            },

            {
              path: '/Subscribe-now',
              element: <ProductPage/>
            }
            
        ]
       
    },

    {
        path: '/admin',
        element: token ? <Admin />  : <LoginPage /> ,

        children: [

            {
                path: 'tickets',
                element: <TicketingSupportSystemPage />
            },

            {
                path: 'users',
                element: <UserManagementPage />
            }
        ]
    },

    
  

    
])


export default router
