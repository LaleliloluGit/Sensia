import { Link } from "react-router-dom"
import logo from "./../../assets/logo_header.png"

function Header() {

  return (
    <>
        <div className="header fixed top-0 left-0 w-full h-20 bg-transparent text-white z-10 grid grid-cols-12 backdrop-blur-sm border border-b-gray-400">
          <div className="col-span-3 flex justify-start items-center gap-5 px-3">
            <Link to="/"><img src={logo} alt="" className="w-50" /></Link>
          </div>
        </div>
    </>
  )
}

export default Header
