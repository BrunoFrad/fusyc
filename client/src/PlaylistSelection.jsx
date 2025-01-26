
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlaylistSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex flex-col items-center justify-center p-4">
      <div className="bg-black shadow-lg rounded-2xl p-6 w-full max-w-md border border-purple-700 text-center">
        <h1 className="text-3xl font-bold text-purple-500 mb-6">Escolha uma Opção</h1>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/playlist/CreatePlaylist')}
            className="w-full bg-purple-700 text-white py-3 rounded font-semibold hover:bg-purple-600 transition"
          >
            Criar Playlist
          </button>
          <button
            onClick={() => navigate('/playlist/EditPlaylist')}
            className="w-full bg-purple-700 text-white py-3 rounded font-semibold hover:bg-purple-600 transition"
          >
            Editar Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSelection;
