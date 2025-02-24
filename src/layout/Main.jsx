import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Header from "../components/nonShared/Header"
import Header2 from "../components/nonShared/Header2"
import Footer from "../components/shared/Footer"

const Main = () => { 
  const location = useLocation();
  
  return (
    <div>
      <div className={`font-bangla ${location.pathname === '/' ? 'bg-white' : 'bg-[#F3F4F7]'}`}>
        <Header></Header>
        <div className="bg-white">
          <Header2></Header2>
        </div>
        <div className=" bg-white">
          <div className="max-w-6xl mx-auto">
            <Navbar></Navbar>
          </div>
          <div className="border-b">

          </div>
        </div>
        <div className="">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>

  )
}

export default Main