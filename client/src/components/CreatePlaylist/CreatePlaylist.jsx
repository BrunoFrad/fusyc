import React, { useState } from 'react';
const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [songs, setSongs] = useState([]);
  const [musicGenre, setGenre] = useState([]);
  const [newSong, setNewSong] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [newLink, setNewLink] = useState('');

  const handleAddSong = () => {
    if (newSong.trim() !== '') {
      setSongs([...songs, newSong]);
      setNewSong('');
    }

    if (newSong.trim() !== '') {
      setGenre([...musicGenre, newGenre]);
      setNewGenre('');
    }

  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  async function handleCreatePlaylist() {
    const response = await fetch('http://localhost:3000/api/newplaylist', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: playlistName, songsArr: songs, genre: musicGenre}),
      method: 'POST',
    })

    document.getElementById('nome-musica').value = '';
    setSongs([]);
    setPlaylistName('');
    setGenre([]);

  }

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="flex flex-col items-center justify-center p-4 modal-box bg-transparent">
        <div className="bg-neutral-800 shadow-lg rounded-2xl p-6 w-full max-w-md border">
          <h1 className="text-3xl font-bold text-center mb-6 text-neutral-200">
            Criar Minha Playlist
          </h1>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2 text-neutral-200">Nome da Playlist</label>
            <input
              type="text"
              placeholder="Digite o nome da playlist"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="border p-3 rounded w-full text-neutral-200"
              id='nome-playlist'
            />
          </div>
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
                className="border p-3 rounded w-full text-neutral-200"
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
          {songs.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-bold text-neutral-200 mb-2">Músicas na Playlist:</h2>
              <ul className="list-disc pl-6 space-y-1 text-neutral-200">
                {songs.map((song, index) => (
                  <li key={index}>{song}</li>
                ))}
              </ul>
            </div>
          )}
          <form method="dialog">
          <button
            onClick={handleCreatePlaylist}
            className="w-full bg-indigo-500 text-white py-3 rounded font-semibold hover:bg-indigo-600 transition"
          >
            Criar Playlist
          </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
export default CreatePlaylist;