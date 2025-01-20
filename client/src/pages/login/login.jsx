import Navbar from "../../components/Navbar/Navbar"
import LoginForm from "../../components/LoginForm/LoginForm"

export default function Login() {
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