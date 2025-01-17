import Navbar from "@/components/Navbar/Navbar"
import LoginForm from "@/components/LoginForm/LoginForm"

export default function Home() {
  return(
    <article className="flex">
        <Navbar />
        <section className="flex w-full">
            <section className="flex w-5/12 justify-center items-center">
                <LoginForm />
            </section>
            <section className="w-7/12 rounded-2xl h-screen bg-neutral-100 dark:bg-neutral-800 flex flex-col justify-center items-center" >
                <h1 className="font-sans font-bold text-6xl">Bem-vindo ao Fusyc</h1>
            </section>
        </section>
    </article>
  )
}