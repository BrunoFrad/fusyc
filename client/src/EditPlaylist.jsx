
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex flex-col items-center justify-center p-4">
      <div className="bg-black shadow-lg rounded-2xl p-6 w-full max-w-md border border-purple-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-500">
          Editar Playlist
        </h1>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2 text-purple-300">Selecione uma Playlist</label>
          <select
            className="border border-purple-700 p-3 rounded w-full bg-black text-purple-300 focus:ring focus:ring-purple-500"
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
            <h2 className="text-xl font-bold text-purple-400 mb-2">Músicas:</h2>
            <ul className="list-disc pl-6 space-y-1 text-purple-300 mb-4">
              {playlists[selectedPlaylist].songs.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </ul>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2 text-purple-300">Adicionar Música</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite o nome da música"
                  value={newSong}
                  onChange={(e) => setNewSong(e.target.value)}
                  className="border border-purple-700 p-3 rounded flex-grow bg-black text-purple-300 focus:ring focus:ring-purple-500"
                />
                <button
                  onClick={handleAddSong}
                  className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPlaylist;
