import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ProductPage from "./pages/ProductPage"
import WhoWeAre from "./pages/WhoWeAre"
import ContactUsPage from "./pages/ContactUsPage"
import Homepage from "./pages/Homepage"
import ProductItemPage from "./pages/ProductItemPage"
import Admin from "./pages/Admin"
import WhatWeDo from "./pages/WhatWeDo"
import BookingPage from './components/BookingPage'
import TicketingSupportSystemPage from "./components/admin/pages/TicketingSupportSystemPage"
import UserManagementPage from "./components/admin/pages/UserManagementPage"
import LoginPage from "./components/admin/pages/LoginPage"
import ErrorPage from "./components/ErrorPage"
import WebContentFrom from "./components/webcontent/WebContentFrom"
import HomepageContent from "./components/webcontent/HomepageContent"
import WhoWeAreContent from "./components/webcontent/WhoWeAreContent"
import WhatWeDoContent from "./components/webcontent/WhatWeDoContent"
import ContactUsContent from "./components/webcontent/ContactUsContent"
import ProductsContent from "./components/webcontent/ProductsContent"

//const content = useContext(ContentContext)

const token = localStorage.getItem('token')


const pageContent = [
    {
        pageName: "Homepage",
        path: 'homepage',
        element: <HomepageContent />
    },

    {
        pageName: "Who We Are",
        path: 'whoweare',
        element: <WhoWeAreContent />
    },

    {
        pageName: "What We Do",
        path: 'whatwedo',
        element: <WhatWeDoContent />
    },

    {
        pageName: "Contact Us",
        path: 'contacts',
        element: <ContactUsContent />
    },

    {
        pageName: "Products",
        path: 'products',
        element: <ProductsContent />
    },


]

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
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

    {
        path: '/login',
        element: <LoginPage />
    },

    {
        path: '/content',
        element: (
                <WebContentFrom />
        ),

        children: pageContent
    }

])

export default router
