import Ancor from "../AncorBox/AncorBox"
import { useState } from "react"

export default function Navbar() {

    let navbarInitialData = {}

    if (sessionStorage.getItem('navbarStatus') == null) {
        navbarInitialData = {
            Home: true,
            Player: false,
            Account: false
        }
        
    }else {
        navbarInitialData = JSON.parse(sessionStorage.getItem('navbarStatus'))
    }

    const [navbar, setNavbar] = useState(navbarInitialData)

    function reloadNavbar(event) {
        switch(event.target.id) {
            case "Home":
                setNavbar({Home : true, Player:false, Account: false})
                sessionStorage.setItem('navbarStatus', JSON.stringify({Home : true, Player:false, Account: false}))
                window.location.replace("http://localhost:5173/index.html")
                break;
            case "Player":
                setNavbar({Home : false, Player:true, Account: false})
                sessionStorage.setItem('navbarStatus', JSON.stringify({Home : false, Player:true, Account: false}))
                window.location.replace("http://localhost:5173/player.html")
                break;
            case "Account":
                setNavbar({Home : false, Player:false, Account: true})
                sessionStorage.setItem('navbarStatus', JSON.stringify({Home : false, Player:false, Account: true}))
                window.location.replace("http://localhost:5173/login.html")
                break;
        }
        console.log(event.target.id)
    }

    return(
        <header className="flex flex-col h-screen w-20 items-center justify-center header bg-neutral-20 0 dark:bg-neutral-800">
            <nav className="flex flex-col justify-evenly h-2/6">
                <Ancor icon={"fa-solid fa-house"} selected={navbar.Home} onClick={reloadNavbar} aid={"Home"} />
                <Ancor icon={"fa-solid fa-music"} selected={navbar.Player} onClick={reloadNavbar} aid={"Player"} />
                <Ancor icon={"fa-solid fa-user"} selected={navbar.Account} onClick={reloadNavbar} aid={"Account"} />
            </nav>
        </header>
    )

}