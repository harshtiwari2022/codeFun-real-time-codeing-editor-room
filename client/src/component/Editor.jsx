import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

export default function EditorPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("Guest");
  const [code, setCode] = useState("// Start coding...");
  const [connectedUsers, setConnectedUsers] = useState([]);

  const socket = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "Guest";
    setUsername(storedName);

    // Connect to Socket.IO server
    socket.current = io("http://localhost:5001", { transports: ["websocket"] });

    // Join room
    socket.current.emit("join-room", { roomId, username: storedName });

    // Listen for code updates
    socket.current.on("code-update", (newCode) => {
      if (newCode !== code) setCode(newCode);
    });

    // Listen for updated user list
    socket.current.on("update-users", (userList) => {
      setConnectedUsers(userList);
    });

    // Clean up on unmount
    return () => {
      socket.current.emit("leave-room", { roomId, username: storedName });
      socket.current.disconnect();
    };
  }, [roomId, code]);

  // Handle local code change
  const onCodeChange = (newValue) => {
    setCode(newValue);
    socket.current.emit("code-change", { roomId, code: newValue });
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    alert("Room ID copied to clipboard!");
  };

  const leaveRoom = () => {
    socket.current.emit("leave-room", { roomId, username });
    socket.current.disconnect();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 p-5 border-r border-zinc-800 flex flex-col">
        <div className="text-lg font-semibold text-purple-400 mb-3">
          👥 Users in Room
        </div>
        <ul className="flex-1 overflow-y-auto space-y-2 text-sm">
          {connectedUsers.length > 0 ? (
            connectedUsers.map((user, idx) => (
              <li
                key={idx}
                className="bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded transition truncate"
                title={user}
              >
                👤 {user}
              </li>
            ))
          ) : (
            <li className="text-zinc-500 italic">No users yet</li>
          )}
        </ul>

        <div className="mt-5">
          <button
            onClick={leaveRoom}
            className="w-full text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            🚪 Leave Room
          </button>
        </div>
      </aside>

      {/* Main Editor */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800 shadow-md">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xl font-bold text-yellow-400">CodeFun</span>
            <span className="bg-zinc-800 text-sm px-2 py-1 rounded">
              Room ID: <strong>{roomId}</strong>
            </span>
            <span
              className="bg-zinc-800 text-sm px-2 py-1 rounded text-purple-400 truncate max-w-[200px]"
              title={`Logged in as ${username}`}
            >
              👤 {username}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyRoomId}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm transition"
            >
              🔗 Copy ID
            </button>
          </div>
        </header>

        {/* Monaco Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language="javascript"
            value={code}
            theme="vs-dark"
            onChange={onCodeChange}
            onMount={(monacoEditor) => (editor.current = monacoEditor)}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 10 },
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </main>
    </div>
  );
}
