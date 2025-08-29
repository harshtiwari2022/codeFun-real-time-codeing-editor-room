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

    const savedRooms = JSON.parse(localStorage.getItem("joinedRooms") || "[]");
    setJoinedRooms(savedRooms);
  }, []);

  const handleJoinRoom = () => {
    if (!username.trim()) return alert("Please enter your username");
    if (!roomId.trim()) return alert("Please enter a room code");

    const newRoom = {
      id: roomId.trim(),
      joinedAt: new Date().toISOString(),
    };

    const updatedRooms = [...joinedRooms, newRoom];
    setJoinedRooms(updatedRooms);
    localStorage.setItem("joinedRooms", JSON.stringify(updatedRooms));

    localStorage.setItem("username", username.trim());
    localStorage.setItem("roomId", roomId.trim());
    navigate(`/editor/${roomId.trim()}`);
  };

  const handleCreateRoom = () => {
    if (!username.trim()) return alert("Please enter your username");

    const newRoomId = uuidv4();
    const newRoom = {
      id: newRoomId,
      joinedAt: new Date().toISOString(),
    };

    const updatedRooms = [...joinedRooms, newRoom];
    setJoinedRooms(updatedRooms);
    localStorage.setItem("joinedRooms", JSON.stringify(updatedRooms));

    localStorage.setItem("username", username.trim());
    localStorage.setItem("roomId", newRoomId);

    navigator.clipboard.writeText(newRoomId);
    alert("New Room Created & Room ID copied to clipboard");
    navigate(`/editor/${newRoomId}`);
  };

  const handleLeaveRoom = (roomId) => {
    const updatedRooms = joinedRooms.filter((room) => room.id !== roomId);
    setJoinedRooms(updatedRooms);
    localStorage.setItem("joinedRooms", JSON.stringify(updatedRooms));
  };

  const handleCopyRoomId = (roomId) => {
    navigator.clipboard.writeText(roomId);
    alert("Room ID copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-6 transition-colors duration-500">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
          Student Dashboard
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          Manage your study rooms and collaborate in real-time.
        </p>
      </header>

      {/* Join/Create Section */}
      <section className="mb-10 max-w-lg mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg">
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
          <div className="flex gap-2">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room code"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleJoinRoom}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
            >
              Join
            </button>
          </div>
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

      {/* Joined Rooms */}
      <section className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Rooms You Joined</h2>
        {joinedRooms.length > 0 ? (
          <ul className="space-y-3">
            {joinedRooms.map((room, idx) => (
              <li
                key={idx}
                className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg flex justify-between items-center shadow-sm"
              >
                <div>
                  <p className="font-medium">Room ID: {room.id}</p>
                  <p className="text-xs text-gray-500">
                    Joined: {new Date(room.joinedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/editor/${room.id}`)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleCopyRoomId(room.id)}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-3 py-1 rounded text-sm"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleLeaveRoom(room.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Leave
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">
            No rooms joined yet.
          </p>
        )}
      </section>
    </div>
  );
} 