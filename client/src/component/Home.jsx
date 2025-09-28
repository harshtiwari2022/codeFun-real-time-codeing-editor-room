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
        <header className="flex items-center justify-between px-8 py-5 sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm transition">
  {/* Logo */}
  <div className="flex items-center space-x-2">
    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />
    <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 dark:text-white">
      codeFun<span className="text-purple-600">.</span>
    </h1>
  </div>

  {/* Navigation */}
  <div className="flex items-center gap-6">
    {/* Dark mode toggle */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
    >
      {darkMode ? (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
      )}
    </button>

    {/* Links */}
    <nav className="hidden sm:flex items-center gap-6">
      <button
        onClick={() => navigate("/")}
        className="relative text-gray-700 dark:text-gray-300 font-medium group"
      >
        Home
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
      </button>
      <button
        onClick={() => navigate("/about")}
        className="relative text-gray-700 dark:text-gray-300 font-medium group"
      >
        About
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
      </button>
    </nav>

    {/* Call to action */}
    <button 
    onClick={()=>navigate("/codereview")}
    className="  hover:scale-105 hover:opacity-95  bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition">
      AI Code Review
    </button>
  </div>
</header>


      {/* Hero Section */}
        <main className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-24 gap-16">
  {/* Left Section - Image/Illustration */}
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="w-full md:w-1/2 flex justify-center relative"
  >
    {/* Soft gradient blob background */}
    <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-12 -right-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />

    {/* Floating container */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-lg"
    >
      {/* Mocked Screenshot or Illustration */}
      <img
        src="/codefun.png"
        alt="Collaborative IDE"
        className="rounded-2xl shadow-2xl relative z-10"
      />

      {/* Floating badges */}
      <span className="absolute top-6 left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-1.5 rounded-full shadow-lg font-medium z-20">
        Candidate
      </span>
      <span className="absolute bottom-8 right-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm px-4 py-1.5 rounded-full shadow-lg font-medium z-20">
        AI Agent
      </span>
    </motion.div>
  </motion.div>

  {/* Right Section - Text */}
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4, duration: 0.8 }}
    className="w-full md:w-1/2 text-center md:text-left"
  >
    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
      Real-time collaborative{" "}
      <span className="text-purple-600 dark:text-purple-400">
        coding rooms
      </span>
    </h1>

    <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
      Spin up a room in seconds. Collaborate seamlessly with a beautiful,
      responsive editor layout, integrated video chat, and real-time sync
      — all in one place.
    </p>

    <ul className="space-y-4 mb-10 text-gray-700 dark:text-gray-300 text-base">
      <li className="flex items-center gap-2">
        <span className="text-green-500 text-xl">✔</span>
        Combine coding, chat, and whiteboard
      </li>
      <li className="flex items-center gap-2">
        <span className="text-green-500 text-xl">✔</span>
        Full-stack frameworks with terminals & file explorers
      </li>
      <li className="flex items-center gap-2">
        <span className="text-green-500 text-xl">✔</span>
        Video, audio, and private notes
      </li>
    </ul>

    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
      {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition shadow-lg">
        Get Started
      </button>
      <button className="px-8 py-3 rounded-xl font-semibold text-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        Learn More
      </button> */}
    </div>
  </motion.div>
</main>


      {/* Student Section */}
       <section className="bg-zinc-100 dark:bg-zinc-950 py-20 px-6 relative overflow-hidden">
  <div className="max-w-6xl mx-auto text-center">
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-zinc-900 dark:text-white">
      🎓 For Students & Learners
    </h2>
    <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto text-lg">
      Practice coding, collaborate with peers, and get real-time mentorship.
    </p>

    {/* Features Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {/* Card 1 */}
      <div className="group bg-white/90 dark:bg-zinc-800/90 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 backdrop-blur-md hover:shadow-2xl hover:-translate-y-2 transition">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6m2 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8h10z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-purple-600 mb-2">Practice Mode</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Join coding rooms and practice real problems together.
        </p>
      </div>

      {/* Card 2 */}
      <div className="group bg-white/90 dark:bg-zinc-800/90 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 backdrop-blur-md hover:shadow-2xl hover:-translate-y-2 transition">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-yellow-500 mb-2">Pair Programming</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Collaborate with a partner to build projects or solve DSA problems.
        </p>
      </div>

      {/* Card 3 */}
      <div className="group bg-white/90 dark:bg-zinc-800/90 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 backdrop-blur-md hover:shadow-2xl hover:-translate-y-2 transition">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-blue-500 mb-2">Live Doubts</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Connect with mentors and get your doubts solved in real-time.
        </p>
      </div>
    </div>

    {/* CTA Button */}
    <button
      onClick={() => navigate("/student")}
      className="mt-12 
         bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 
         text-black px-8 py-3 rounded-xl font-semibold text-lg 
         shadow-md transition duration-500 ease-in-out
         hover:scale-105 hover:opacity-95 
         hover:shadow-[0_0_12px_rgba(255,215,0,0.4),0_0_25px_rgba(255,165,0,0.3)]"
    >
      🚀 Join as Student
    </button>
  </div>
</section>


      {/* Interview Section */}
        <section className="bg-white dark:bg-zinc-900 py-20 px-6 relative overflow-hidden">
  <div className="max-w-6xl mx-auto text-center">
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-zinc-900 dark:text-white">
      🧠 Live Interviews Made Easy
    </h2>
    <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto text-lg">
      Conduct technical interviews with real-time code collaboration, switch languages, and evaluate instantly.
    </p>

    {/* Features */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
      {/* Feature 1 */}
      <div className="group bg-white/90 dark:bg-zinc-800/90 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 backdrop-blur-md hover:shadow-2xl hover:-translate-y-2 transition">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6m2 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8h10z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-purple-600 mb-2">Code Together</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Real-time collaborative editor with syntax highlighting.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="group bg-white/90 dark:bg-zinc-800/90 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 backdrop-blur-md hover:shadow-2xl hover:-translate-y-2 transition">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.868v4.264a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-yellow-500 mb-2">Switch Languages</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Seamlessly change between JavaScript, Python, C++, and more.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="group bg-white/90 dark:bg-zinc-800/90 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 backdrop-blur-md hover:shadow-2xl hover:-translate-y-2 transition">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900 mb-4 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h8M4 10h8m-8 4h8m0 0l4 2m-4-6l4-2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-blue-500 mb-2">Instant Evaluation</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Review code execution results live and provide feedback instantly.
        </p>
      </div>
    </div>

    {/* CTA */}
    <button
      onClick={() => navigate("/interview")}
      className="    hover:scale-105 hover:opacity-95
    bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
    >
      🎯 Start Interview Room
    </button>
  </div>
</section>


      {/* Footer */}
           <footer className="bg-black/70 backdrop-blur-md border-t border-gray-800 py-8">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
    
    {/* Left - Brand */}
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-purple-600" />
      <span className="text-lg font-semibold text-white">CodeFun</span>
    </div>

    {/* Right - Copyright */}
    <div className="text-sm text-gray-500">
      &copy; {new Date().getFullYear()} CodeFun · Built by{" "}
      <span className="text-purple-400 font-medium">Harsh</span>
    </div>
  </div>
</footer>

    </div>
  );
}
