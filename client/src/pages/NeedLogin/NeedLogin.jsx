import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

export default function NeedLogin() {
    return (
        <div className="flex">
            <Navbar />
            <h1 className="flex justify-center items-center w-full h-screen text-6xl font-bold text-neutral-400">Você não está logado :/</h1>
        </div>
    )
}