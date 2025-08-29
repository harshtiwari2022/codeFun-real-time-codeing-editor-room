// src/pages/Student.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getRooms, createRoom, joinRoom } from "../service/api";

export default function Student() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joinedRooms, setJoinedRooms] = useState([]);

  // Fetch rooms from backend
  useEffect(() => {
    const savedName = localStorage.getItem("username") || "";
    setUsername(savedName);

    const fetchRooms = async () => {
      try {
        const rooms = await getRooms();
        setJoinedRooms(rooms);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  const handleJoinRoom = async () => {
    if (!username.trim() || !roomId.trim()) return alert("Enter all fields");
    try {
      const room = await joinRoom(roomId.trim(), username.trim());
      setJoinedRooms((prev) => [...prev, room]);
      localStorage.setItem("username", username.trim());
      navigate(`/editor/${room.roomId}`);
    } catch (err) {
      alert(err.response?.data?.message || "Error joining room");
    }
  };

  const handleCreateRoom = async () => {
    if (!username.trim()) return alert("Enter your username");
    const newRoomId = uuidv4();
    try {
      const room = await createRoom(newRoomId, username.trim());
      setJoinedRooms((prev) => [...prev, room]);
      localStorage.setItem("username", username.trim());
      navigator.clipboard.writeText(newRoomId);
      alert("New Room Created & Room ID copied");
      navigate(`/editor/${room.roomId}`);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating room");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-8">
        Student Dashboard
      </h1>

      <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg mb-10">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter room code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleJoinRoom}
            className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
          >
            Join Room
          </button>
        </div>
        <button
          onClick={handleCreateRoom}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
        >
          Create New Study Room
        </button>
      </div>

      <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Joined Rooms</h2>
        {joinedRooms.length === 0 ? (
          <p>You haven't joined any rooms yet.</p>
        ) : (
          <ul className="space-y-3">
            {joinedRooms.map((room) => (
              <li
                key={room.roomId}
                className="flex justify-between items-center bg-gray-100 dark:bg-zinc-800 p-3 rounded-lg"
              >
                <span
                  className="cursor-pointer text-purple-600 dark:text-purple-400 hover:underline"
                  onClick={() => navigate(`/editor/${room.roomId}`)}
                >
                  {room.roomId}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
