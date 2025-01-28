
import React, { useState, useEffect } from 'react';

const EditPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newSong, setNewSong] = useState('');
  const [musicGenre, setGenre] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const [newLink, setNewLink] = useState('');

  const handleAddSong = () => {
    if (newSong.trim() !== '' && selectedPlaylist !== null && newGenre.trim() !== '') {
      const updatedPlaylists = playlists.map((playlist, index) => {
        if (index === selectedPlaylist) {
          return { 
            ...playlist, 
            songs: [...playlist.songs, newSong], 
            genre: [...playlist.genre, newGenre],
            link : [...playlist.link, newLink],
          };
        }
        console.log(playlist)
        return playlist;
      });
      setPlaylists(updatedPlaylists);
      setNewSong('');
      setNewGenre('');
    }
  };  

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

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/editplaylist', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          name: playlists[selectedPlaylist].name,
          songlist: playlists[selectedPlaylist].songs,
          genre: playlists[selectedPlaylist].genre,
          username : localStorage.getItem('username'),
          link : playlists[selectedPlaylist].link,
        }),
      });

      console.log(playlists[selectedPlaylist].link)
  
      const data = await response.json();
      console.log(data);
  
      if (data.success) {
        setNewSong('');
        setNewGenre('');
        setGenre([]);
      }
  
    } catch (error) {
      console.error('Error:', error);
    }

    location.reload();

  };
  

  useEffect(() => {

    getPlaylistNames()

  }, []);

  return (
    <dialog id="my_modal_2" className="modal overflow-auto">
      <div className="flex flex-col items-center justify-center p-4 modal-box bg-transparent">
        <div className="bg-neutral-800 shadow-lg rounded-2xl p-6 w-full max-w-md border">
          <h1 className="text-3xl font-bold text-center mb-6 text-neutral-200">
            Editar Playlist
          </h1>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2 text-neutral-200">Selecione uma Playlist</label>
            <select
              className="p-3 rounded w-full bg-neutral-900 text-neutral-200"
              onChange={(e) => setSelectedPlaylist(parseInt(e.target.value))}
            >
              <option value="" disabled selected>Escolha uma playlist</option>
              {playlists.map((playlist, index) => (
                <option key={index} value={index}>{playlist.name}</option>
              ))}
            </select>
          </div>
          {selectedPlaylist !== null && (
            <div>
              <h2 className="text-xl font-bold text-neutral-200 mb-2">Músicas:</h2>
              <ul className="list-disc pl-6 space-y-1 text-neutral-200 mb-4">
                {playlists[selectedPlaylist].songs.map((song, index) => (
                  <li key={index}>{song} | {playlists[selectedPlaylist].genre[index]}</li>
                ))}
              </ul>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2 text-neutral-200">Adicionar Música</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Digite o nome da música"
                    value={newSong}
                    onChange={(e) => setNewSong(e.target.value)}
                    className="border p-3 rounded w-full text-neutral-200"
                    id='nome-musica'
                  />
                  <input
                    type="text"
                    placeholder="Digite a categoria da música"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="border p-3 rounded w-full text-neutral-200 mb-3"
                    id='genero-musica'
                  />
                  <input
                    type="text"
                    placeholder="Digite o link do spotify da sua musica"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    className="border p-3 rounded w-full text-neutral-200 mb-3"
                    id='link-musica'
                  />
                  <button
                    onClick={handleAddSong}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
              <form method="dialog" className="flex w-full justify-center">
                <button className="bg-indigo-500 text-white p-3 w-full rounded hover:bg-indigo-600" onClick={handleSubmit}>Confirmar</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default EditPlaylist;
