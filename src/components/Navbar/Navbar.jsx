'use client'

import Home from "@/app/page"
import Ancor from "@/components/AncorBox/AncorBox"
import { useState } from "react"

export default function Navbar() {

    const [navbar, setNavbar] = useState({
        Home : true,
        Player : false,
        Account : false
    })

    function reloadNavbar(event) {
        switch(event.target.id) {
            case "Home":
                setNavbar({Home : true, Player:false, Account: false})
                break;
            case "Player":
                setNavbar({Home : false, Player:true, Account: false})
                break;
            case "Account":
                setNavbar({Home : false, Player:false, Account: true})
                break;
        }
        console.log(event.target.id)
    }

    return(
        <header className="flex flex-col h-screen w-20 items-center justify-center header bg-neutral-100 dark:bg-neutral-800">
            <nav className="flex flex-col justify-evenly h-2/6">
                <Ancor icon={"fa-solid fa-house"} selected={navbar.Home} onClick={reloadNavbar} aid={"Home"} />
                <Ancor icon={"fa-solid fa-music"} selected={navbar.Player} onClick={reloadNavbar} aid={"Player"} />
                <Ancor icon={"fa-solid fa-user"} selected={navbar.Account} onClick={reloadNavbar} aid={"Account"} />
            </nav>
        </header>
    )

}