import Navbar from "../../components/Navbar/Navbar"
import FeatureBox from "../../components/FeatureBox/FeatureBox"

export default function App() {

  if(localStorage.getItem("login") === null) {
    localStorage.setItem("login", false)
  }else {
    if(localStorage.getItem("login") === "false") {
      window.location.replace("http://localhost:5173/need-login.html")
    }else {
      return(
        <div className="flex">
          <Navbar />
          <div className="flex flex-col w-full justify-center items-center gap-20">
            <h1 className="text-6xl font-bold text-neutral-500">Bem-Vindo ao Fusyc</h1>
            <div className="flex flex-row justify-evenly w-3/6">
              <FeatureBox title={"Criar nova playlist! 🎉"} />
              <FeatureBox title={"Editar uma playlist! 📝"} />
            </div>
          </div>
        </div>
      )
    }
  }
}