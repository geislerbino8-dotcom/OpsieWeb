import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ProductPage from "./components/pages/ProductPage"
import WhoWeAre from "./components/pages/WhoWeAre"
import WhatWeDoPage from "./components/pages/WhatWeDoPage"
import ContactUsPage from "./components/pages/ContactUsPage"
import Homepage from "./components/pages/Homepage"

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
                element: <WhatWeDoPage />
            },

            {
                path: '/contact-us',
                element: <ContactUsPage />
            }
        ]
       
    },

    
])


export default router
