import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ProductPage from "./pages/ProductPage"
import WhoWeAre from "./pages/WhoWeAre"
import WhatWeDoPage from "./pages/WhatWeDoPage"
import ContactUsPage from "./pages/ContactUsPage"
import Homepage from "./pages/Homepage"
import ProductItemPage from "./pages/ProductItemPage"
import OpsieTicketingSystem from "./pages/OpsieTicketingSystem"
import WhatWeDo from "./pages/WhatWeDo"

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
            
        ]
       
    },

    {
        path: '/admin',
        element: <OpsieTicketingSystem />
    }

    
])


export default router
