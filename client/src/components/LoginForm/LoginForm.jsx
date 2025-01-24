export default function LoginForm() {
    
    async function handleSubmit() {
        await fetch('http://localhost:3000/api/loginSuccessful').then((res) => {
            console.log(res.status)
            if(res.status === 200) {
                localStorage.setItem("login", "true")
                window.location.replace('http://localhost:5173/index.html');
            }
        })
    }

    return(

        <form className="flex items-center font-bold text-neutral-300 bg-neutral-800 w-5/6 h-5/6 rounded-3xl shadow-xl" action="http://localhost:3000/api/login" method="POST">
            <div className="flex flex-col items-center justify-evenly h-4/6 w-full">
                <h1 className="text-6xl">Entrar</h1>
                <label className="input input-bordered flex items-center gap-2 bg-neutral-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Usuario" name="username" />
                </label>
                <label className="input input-bordered flex items-center gap-2 bg-neutral-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
                    </svg>
                    <input type="password" className="grow" placeholder="Senha" name="password" />
                </label>
                <button className="btn btn-primary w-40 text-neutral-300" type="submit" onClick={handleSubmit} >Submit</button>
            </div>
        </form>
    )
}