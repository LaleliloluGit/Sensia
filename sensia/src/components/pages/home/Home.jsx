import { Outlet } from "react-router-dom"
import Header from "../../common/Header"

function Home() {

  return (
    <div className="h-screen w-screen relative">
      {/* Div gigante centrado */}
      <div className="w-screen h-screen fixed top-0 left-0 overflow-hidden">
        <div className="arcoiris absolute w-[300vw] h-[300vh] -z-20"></div>
      </div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Home
