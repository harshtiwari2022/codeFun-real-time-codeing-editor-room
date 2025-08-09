import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

const languageOptions = [
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "cpp", name: "C++" },
  { id: "java", name: "Java" },
];

export default function EditorPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("Guest");
  const [code, setCode] = useState("// Start coding...");
  const [language, setLanguage] = useState("javascript");
  const [connectedUsers, setConnectedUsers] = useState([]);

  const socket = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "Guest";
    setUsername(storedName);

    socket.current = io("http://localhost:5000");
    socket.current.emit("join-room", roomId, storedName);

    socket.current.on("code-change", (newCode) => {
      if (newCode !== code) setCode(newCode);
    });

    socket.current.on("language-change", (newLang) => {
      if (newLang !== language) setLanguage(newLang);
    });

    socket.current.on("update-users", (userList) => {
      setConnectedUsers(userList);
    });

    return () => {
      socket.current.emit("leave-room", roomId, storedName);
      socket.current.disconnect();
    };
  }, [roomId]);

  const onCodeChange = (newValue) => {
    if (newValue !== code) {
      setCode(newValue);
      socket.current.emit("code-change", newValue, roomId);
    }
  };

  const onLanguageChange = (e) => {
    const selected = e.target.value;
    if (selected !== language) {
      setLanguage(selected);
      socket.current.emit("language-change", selected, roomId);
    }
  };

  const copyRoomId = () => navigator.clipboard.writeText(roomId);
  const leaveRoom = () => {
    socket.current.emit("leave-room", roomId, username);
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

      {/* Main */}
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
            <select
              value={language}
              onChange={onLanguageChange}
              className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {languageOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>

            <button
              onClick={copyRoomId}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm transition"
            >
              🔗 Copy ID
            </button>
          </div>
        </header>

        {/* Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={onCodeChange}
            onMount={(monacoEditor) => (editor.current = monacoEditor)}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 10 },
              smoothScrolling: true,
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </main>
    </div>
  );
}
