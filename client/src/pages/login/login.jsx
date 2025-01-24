import Navbar from "../../components/Navbar/Navbar"
import LoginForm from "../../components/LoginForm/LoginForm"
import SignUpForm from "../../components/SingupForm/SignUpForm"

export default function Login() {

  if(localStorage.getItem("goLogin") === null) {
    localStorage.setItem("goLogin", false)
  }else {

    if(localStorage.getItem("goLogin") === "false") {
      return(
        <article className="flex">
            <Navbar />
            <section className="flex w-full justify-center">
                <section className="flex w-5/12 justify-center items-center">
                    <SignUpForm />
                </section>
            </section>
        </article>
      )
    }else {
      return(
        <article className="flex">
            <Navbar />
            <section className="flex w-full justify-center">
                <section className="flex w-5/12 justify-center items-center">
                    <LoginForm />
                </section>
            </section>
        </article>
      )
    }

  }

  
}