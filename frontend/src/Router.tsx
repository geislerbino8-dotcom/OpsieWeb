import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense, type ReactNode } from "react"
import App from "./App"
import ErrorPage from "./components/ErrorPage"

const ProductPage = lazy(() => import("./pages/ProductPage"))
const WhoWeAre = lazy(() => import("./pages/WhoWeAre"))
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"))
const Homepage = lazy(() => import("./pages/Homepage"))
const ProductItemPage = lazy(() => import("./pages/ProductItemPage"))
const Admin = lazy(() => import("./pages/Admin"))
const WhatWeDo = lazy(() => import("./pages/WhatWeDo"))
const BookingPage = lazy(() => import("./components/BookingPage"))
const TicketingSupportSystemPage = lazy(() => import("./components/admin/pages/TicketingSupportSystemPage"))
const UserManagementPage = lazy(() => import("./components/admin/pages/UserManagementPage"))
const LoginPage = lazy(() => import("./components/admin/pages/LoginPage"))
const DashboardPage = lazy(() => import("./components/admin/pages/DashboardPage"))
const WebContentFrom = lazy(() => import("./components/webcontent/WebContentFrom"))
const HomepageContent = lazy(() => import("./components/webcontent/HomepageContent"))
const WhoWeAreContent = lazy(() => import("./components/webcontent/WhoWeAreContent"))
const WhatWeDoContent = lazy(() => import("./components/webcontent/WhatWeDoContent"))
const ContactUsContent = lazy(() => import("./components/webcontent/ContactUsContent"))
const ProductsContent = lazy(() => import("./components/webcontent/ProductsContent"))
const AddProductCMS = lazy(() => import("./components/webcontent/sections/AddProductCMS"))
const ProductCMS = lazy(() => import("./components/webcontent/sections/ProductCMS"))

function loadRoute(element: ReactNode) {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" role="status">Loading page…</div>}>
      {element}
    </Suspense>
  )
}

const token = localStorage.getItem('token')

const pageContent = [
    {
        pageName: "Homepage",
        path: 'homepage',
        element: loadRoute(<HomepageContent />)
    },

    {
        pageName: "Who We Are",
        path: 'whoweare',
        element: loadRoute(<WhoWeAreContent />)
    },

    {
        pageName: "What We Do",
        path: 'whatwedo',
        element: loadRoute(<WhatWeDoContent />)
    },

    {
        pageName: "Contact Us",
        path: 'contacts',
        element: loadRoute(<ContactUsContent />)
    },

    {
        pageName: "Products",
        path: 'prod',
        element: loadRoute(<ProductsContent />)
    },

    {
        pageName: "Product",
        path: 'add-product',
        element: loadRoute(<AddProductCMS />)
    }, 
    
    {
        pageName: "Product",
        path: 'view-products',
        element: loadRoute(<ProductCMS />)
    }
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: loadRoute(<Homepage />)
            },
            {
                path: '/products',
                element: loadRoute(<ProductPage />)
            },

            {
                path: '/who-we-are',
                element: loadRoute(<WhoWeAre />)
            },

            {
                path: '/what-we-do',
                element: loadRoute(<WhatWeDo />)
            },

            {
                path: '/contact-us',
                element: loadRoute(<ContactUsPage />)
            },
            {
                path: '/products/:id',
                element: loadRoute(<ProductItemPage />)
            },

            {
                path: '/book-a-schedule',
                element: loadRoute(<BookingPage />)
            },

            {
                path: '/buy-now',
                element: loadRoute(<ProductPage />)
            },

            {
                path: '/buy-now',
                element: loadRoute(<ProductPage />)
            },

            {
              path: '/Subscribe-now',
              element: loadRoute(<ProductPage />)
            }
            
        ]
       
    },

    {
        path: '/admin',
        element: token ? loadRoute(<Admin />) : loadRoute(<LoginPage />),

        children: [
            {
                index: true,
                element: loadRoute(<DashboardPage />)
            },

            {
                path: 'tickets',
                element: loadRoute(<TicketingSupportSystemPage />)
            },

            {
                path: 'users',
                element: loadRoute(<UserManagementPage />)
            },

             {
                path: 'content',
                element: loadRoute(<WebContentFrom />),
                children: pageContent
            }
        ]
    },

    {
        path: '/login',
        element: <LoginPage />
    },

])

export default router
