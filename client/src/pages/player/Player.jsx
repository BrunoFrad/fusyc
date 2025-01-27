import Navbar from "../../components/Navbar/Navbar"

import { useState, useEffect } from "react"

export default function Player() {

    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);

    async function getPlaylistNames() {
        try {
          const response = await fetch('http://localhost:3000/api/playlists');
          const data = await response.json();
          setPlaylists(data.result);
          console.log(data.result)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
    
        getPlaylistNames()
    
      }, []);

    if (localStorage.getItem("login") === null) {
        localStorage.setItem("login", false)
    } else {
        if (localStorage.getItem("login") === "false") {
            window.location.replace("http://localhost:5173/need-login.html")
        } else {
            return(
                <div className="flex">
        
                    <Navbar />
                    <div className="grid grid-rows-2 w-full h-80 place-content-center">
                        <div className="flex gap-10">
                            <select
                            className="p-3 rounded h-16 bg-neutral-800 text-neutral-200 mt-5"
                            onChange={(e) => setSelectedPlaylist(parseInt(e.target.value))}
                            >
                            <option value="" disabled selected>Escolha uma playlist</option>
                            {playlists.map((playlist, index) => (
                                <option key={index} value={index}>{playlist.name}</option>
                            ))}
                            </select>
                            {selectedPlaylist !== null && selectedPlaylist !== "" && (
                                <select
                                    className="p-3 rounded h-16 bg-neutral-800 text-neutral-200 mt-5"
                                    onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                                >
                                    <option value="" disabled selected>
                                        Filtre por categoria
                                    </option>
                                    {playlists.map((playlist, index) => (
                                        playlist.genre
                                        .map((categ, index) => {
                                        
                                            console.log(selectedPlaylist)
        
                                            if(categ != null) {
                                                return(
                                                    <option key={index} value={index}>
                                                        {categ}
                                                    </option>
                                                )
                                            }
                                    })
                                    ))}
                                </select>
                            )}
                            <select
                                className="p-3 rounded h-16 bg-neutral-800 text-neutral-200 mt-5"
                                onChange={(e) => setSelectedSong(parseInt(e.target.value))}
                            >
                                <option value="" disabled selected>
                                    Selecione a musica
                                </option>
                                {playlists.map((playlist, index) => (
                                    playlist.songs
                                        .map((song, index) => {
        
                                            console.log(selectedCategory)
        
                                            if (song != null) {
                                                if(selectedCategory == null) {
                                                    return (
                                                        <option key={index} value={index}>
                                                            {song}
                                                        </option>
                                                    )
                                                }else {
                                                    if (index == selectedCategory) {
                                                        return (
                                                            <option key={index} value={index}>
                                                                {song}
                                                            </option>
                                                        )
                                                    }
                                                }
                                            }
                                        })
                                ))}
                            </select>
                        </div>
                        {selectedSong !== null && selectedSong !== "" && (
                            <div className="flex w-full h-full justify-center items-center mt-28">
                            <iframe className="rounded-2xl" src={selectedPlaylist} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
    }
}