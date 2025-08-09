import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleJoin = () => {
    if (!username.trim()) return alert("Please enter your username");
    const trimmedId = roomId.trim();
    if (!trimmedId) return alert("Enter a valid Room ID");

    localStorage.setItem("username", username.trim());
    localStorage.setItem("roomId", trimmedId);

    navigate(`/editor/${trimmedId}`);
  };

  const handleCreateNewRoom = () => {
    if (!username.trim()) return alert("Please enter your username");

    const id = uuidv4();
    setRoomId(id);

    localStorage.setItem("username", username.trim());
    localStorage.setItem("roomId", id);

    navigator.clipboard.writeText(id);
    alert("New Room Created & ID copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-all duration-500">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-5 shadow-md bg-white dark:bg-zinc-900 transition">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-600" />
          <h1 className="text-xl font-bold">codeFun..</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-800" />
            )}
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            Home
          </button>
           <button
               onClick={() => navigate("/about")}
               className="text-gray-600 dark:text-gray-300 hover:underline"
             >
      About
    </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
            Get Started
          </button>
          
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Real-time collaborative <br />
          <span className="text-purple-600 dark:text-purple-400">coding rooms</span>
        </motion.h1>

        <motion.p
          className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Spin up a room in seconds. Code together with a beautiful, responsive editor layout and built-in chat.
        </motion.p>

        {/* 3D Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mb-12"
        >
          <img
            src="/codefun.png"
            alt="3D illustration"
            className="w-64 md:w-80 mx-auto drop-shadow-lg"
          />
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={handleCreateNewRoom}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Create a Room
          </button>
          <button
            onClick={handleJoin}
            className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            Join with Code
          </button>
        </div>

        {/* Form */}
        <main className="w-full max-w-xl mx-auto px-4 space-y-6">
  <div>
    <label className="block text-sm font-medium mb-1 text-white dark:text-gray-200">
      Your name
    </label>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full px-4 py-3 rounded-md border border-gray-600 dark:border-zinc-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder="Enter your name"
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1 text-white dark:text-gray-200">
      Room code
    </label>
    <input
      type="text"
      value={roomId}
      onChange={(e) => setRoomId(e.target.value)}
      className="w-full px-4 py-3 rounded-md border border-gray-600 dark:border-zinc-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholder="e.g. 4x9kcp2n"
    />
  </div>
  <div className="flex gap-4">
    <button
      onClick={handleCreateNewRoom}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg w-full transition"
    >
      Create room
    </button>
    <button
      onClick={handleJoin}
      className="bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white px-6 py-3 rounded-lg w-full transition"
    >
      Join room
    </button>
  </div>
  <p className="text-sm text-gray-400 dark:text-gray-500 pt-2 text-center">
    Share a room code or send the link. Real-time syncing is mocked locally for now.
  </p>
</main>

      </main>

      {/* Interview Section */}
      <section className="bg-white dark:bg-zinc-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900 dark:text-white">
            🧠 Live Interviews Made Easy
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Conduct technical interviews with real-time code collaboration, switch languages, and evaluate instantly.
          </p>
          <button
            onClick={() => navigate("/interview")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
          >
            Start Interview Room
          </button>
        </div>
      </section>

      {/* Student Section */}
      <section className="bg-zinc-100 dark:bg-zinc-950 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900 dark:text-white">
            🎓 For Students & Learners
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Practice coding, collaborate with peers, and get real-time mentorship.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700">
              <h3 className="text-xl font-semibold text-purple-500 mb-2">Practice Mode</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Join coding rooms and practice real problems together.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700">
              <h3 className="text-xl font-semibold text-yellow-500 mb-2">Pair Programming</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Collaborate with a partner to build projects or solve DSA problems.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">Live Doubts</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Connect with mentors and get your doubts solved in real-time.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/student")}
            className="mt-10 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            Join as Student
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} CodeFun · Built by <span className="text-purple-600 dark:text-purple-400">Harsh</span>
      </footer>
    </div>
  );
}
