import { Link } from "react-router-dom"
// import logo from "./../../assets/logo_header.png"
import videoLogo from "./../../assets/videos/sensiaa.gif"

function Header() {

  return (
    <>
        <div className="header fixed top-0 left-0 w-full h-20 bg-transparent text-white z-30 grid grid-cols-12 backdrop-blur-sm">
          <div className="col-span-3 flex justify-start items-center gap-5 px-3">
            <Link to="/sensia"><img src={videoLogo} alt="" className="w-55" /></Link>
            {/* <Link to="/sensia"><video src={videoLogo} controls autoPlay muted></video></Link> */}
          </div>
        </div>
    </>
  )
}

export default Header
