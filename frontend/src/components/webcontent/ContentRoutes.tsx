import { Route, Routes } from "react-router-dom"
import HomepageContent from "./HomepageContent"
import WhoWeAreContent from "./WhoWeAreContent";


function ContentRoutes() {

  let routes


    routes = (
        <>
            <Routes>
                <Route path="/content/homepage" element={<HomepageContent />} />
                <Route path="/content/whoweare" element={<WhoWeAreContent />} />
            </Routes>
        </>
    )
  


  return routes
}

export default ContentRoutes
