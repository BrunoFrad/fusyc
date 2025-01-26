
import React, { useState } from 'react';

const EditPlaylist = () => {
  const [playlists, setPlaylists] = useState([
    { name: 'Playlist 1', songs: ['Song 1', 'Song 2'] },
    { name: 'Playlist 2', songs: ['Song 3', 'Song 4'] }
  ]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newSong, setNewSong] = useState('');

  const handleAddSong = () => {
    if (newSong.trim() !== '' && selectedPlaylist !== null) {
      const updatedPlaylists = playlists.map((playlist, index) => {
        if (index === selectedPlaylist) {
          return { ...playlist, songs: [...playlist.songs, newSong] };
        }
        return playlist;
      });
      setPlaylists(updatedPlaylists);
      setNewSong('');
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
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
                  <li key={index}>{song}</li>
                ))}
              </ul>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2 text-neutral-200">Adicionar Música</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite o nome da música"
                    value={newSong}
                    onChange={(e) => setNewSong(e.target.value)}
                    className="border p-3 rounded w-full text-neutral-200"
                    id='nome-musica'
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
                <button className="bg-indigo-500 text-white px-36 py-2 rounded-2xl hover:bg-indigo-600">Confirmar</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default EditPlaylist;
