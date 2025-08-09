import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Student() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joinedRooms, setJoinedRooms] = useState([]);

  useEffect(() => {
    const savedName = localStorage.getItem("username") || "";
    setUsername(savedName);

    // Load joined rooms from localStorage or backend here (mocked for now)
    const savedRooms = JSON.parse(localStorage.getItem("joinedRooms") || "[]");
    setJoinedRooms(savedRooms);
  }, []);

  const handleJoinRoom = () => {
    if (!username.trim()) return alert("Please enter your username");
    if (!roomId.trim()) return alert("Please enter a room code");

    // Save to joined rooms
    const updatedRooms = [...joinedRooms, roomId.trim()];
    setJoinedRooms(updatedRooms);
    localStorage.setItem("joinedRooms", JSON.stringify(updatedRooms));

    localStorage.setItem("username", username.trim());
    localStorage.setItem("roomId", roomId.trim());
    navigate(`/editor/${roomId.trim()}`);
  };

  const handleCreateRoom = () => {
    if (!username.trim()) return alert("Please enter your username");

    const newRoomId = uuidv4();
    const updatedRooms = [...joinedRooms, newRoomId];
    setJoinedRooms(updatedRooms);
    localStorage.setItem("joinedRooms", JSON.stringify(updatedRooms));

    localStorage.setItem("username", username.trim());
    localStorage.setItem("roomId", newRoomId);

    navigator.clipboard.writeText(newRoomId);
    alert("New Room Created & Room ID copied to clipboard");
    navigate(`/editor/${newRoomId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-6 transition-colors duration-500">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">Student Dashboard</h1>
      </header>

      <section className="mb-10 max-w-xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Join a Room</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room code"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleJoinRoom}
            className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Join Room
          </button>
        </div>

        <div>
          <button
            onClick={handleCreateRoom}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Create New Study Room
          </button>
        </div>
      </section>

      <section className="max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Rooms You Joined</h2>
        {joinedRooms.length > 0 ? (
          <ul className="space-y-2">
            {joinedRooms.map((room, idx) => (
              <li
                key={idx}
                className="bg-gray-200 dark:bg-zinc-800 p-3 rounded-lg flex justify-between items-center"
              >
                <span className="truncate max-w-xs">Room ID: {room}</span>
                <button
                  onClick={() => navigate(`/editor/${room}`)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded"
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">No rooms joined yet.</p>
        )}
      </section>
    </div>
  );
}
