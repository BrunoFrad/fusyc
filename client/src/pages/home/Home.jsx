import Navbar from "../../components/Navbar/Navbar"

export default function App() {

  if(localStorage.getItem("login") === null) {
    localStorage.setItem("login", false)
  }else {
    if(localStorage.getItem("login") === "false") {
      window.location.replace("http://localhost:5173/need-login.html")
    }else {
      return(
        <Navbar />
      )
    }
  }
}