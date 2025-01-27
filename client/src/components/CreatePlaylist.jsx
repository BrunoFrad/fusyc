import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreatePlaylist = () => {
    if (playlistName.trim() === '') {
      alert('Por favor, insira um nome para a playlist.');
      return;
    }

    if (!selectedFile) {
      alert('Por favor, insira um arquivo de música.');
      return;
    }

    // Simulação de criação de playlist com arquivo
    console.log('Playlist criada:', playlistName);
    console.log('Arquivo selecionado:', selectedFile.name);

    alert('Playlist criada com sucesso!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex flex-col items-center justify-center p-4">
      <div className="bg-black shadow-lg rounded-2xl p-6 w-full max-w-md border border-purple-700 text-center">
        <h1 className="text-3xl font-bold text-purple-500 mb-6">Criar Playlist</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleCreatePlaylist(); }}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nome da Playlist"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full bg-black text-purple-300 border border-purple-700 p-3 rounded focus:ring focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="w-full bg-black text-purple-300 border border-purple-700 p-3 rounded focus:ring focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded font-semibold hover:bg-purple-600 transition"
          >
            Criar Playlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylist;
