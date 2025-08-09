import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const languages = [
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
];

const questions = [
  "1. Write a function to reverse a string.",
  "2. Find the largest number in an array.",
  "3. Implement a function to check for a palindrome.",
  "4. Write a program to generate Fibonacci numbers.",
];

export default function Interview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Auth state
  const [email, setEmail] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Interview states
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding here...");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [timer, setTimer] = useState(60 * 30); // 30 minutes
  const chatEndRef = useRef(null);

  // Validate email format
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Check for URL param auth on mount
  useEffect(() => {
    const authEmail = searchParams.get("auth");
    if (authEmail && validateEmail(authEmail)) {
      setEmail(authEmail);
      setAuthenticated(true);
    }
  }, [searchParams]);

  // Countdown Timer
  useEffect(() => {
    if (!authenticated) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [authenticated]);

  // Scroll chat to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Join interview manually
  const handleManualAuth = () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }
    setAuthenticated(true);
  };

  // Chat message send handler
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), text: chatInput.trim(), sender: "You" },
    ]);
    setChatInput("");
  };

  // Chat input Enter key handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timer display
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Show email input if not authenticated yet
           if (!authenticated) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-purple-500">
          Join Interview Room
        </h2>
        <p className="text-center text-gray-400 text-sm">
          Please enter your email to join the interview session.
        </p>

        <label htmlFor="email" className="block text-sm font-semibold text-gray-300">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full rounded-md border border-gray-700 bg-black text-white px-4 py-3 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          required
        />

        <button
          onClick={handleManualAuth}
          className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold rounded-md py-3 shadow-md transition transform hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-400"
        >
          Join Interview
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full text-purple-500 hover:text-purple-600 font-semibold rounded-md py-2 border border-purple-600 hover:border-purple-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

  // Main interview UI after authentication
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-all duration-500 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-zinc-900">
        <div>
          <h1
            className="text-2xl font-bold text-purple-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            codeFun.. Interview
          </h1>
          <p className="text-sm text-gray-500">Candidate: {email}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-yellow-400">
            ⏰ Time Left: {formatTime(timer)}
          </span>
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            Back Home
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex flex-1 flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto w-full">

        {/* Code Editor */}
        <section className="flex flex-col flex-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Code Editor</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md px-3 py-1 text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-white dark:bg-black dark:text-white border border-gray-300 dark:border-zinc-700 rounded-md p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={20}
            spellCheck={false}
          />
        </section>

        {/* Sidebar Panel */}
        <section className="flex flex-col w-full md:w-96 space-y-4">
          {/* Question Box */}
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Interview Question</h2>
            <select
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
              className="w-full bg-white dark:bg-black text-sm border border-gray-300 dark:border-zinc-700 rounded-md p-2 mb-3"
            >
              {questions.map((q, idx) => (
                <option key={idx} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <div className="bg-white dark:bg-black border border-gray-300 dark:border-zinc-700 rounded-md p-3 text-sm text-gray-800 dark:text-gray-200">
              {selectedQuestion}
            </div>
          </div>

          {/* Chat Box */}
          <div className="flex flex-col bg-zinc-100 dark:bg-zinc-900 rounded-lg shadow-md p-4 h-80">
            <h2 className="text-xl font-semibold mb-2">Chat</h2>
            <div className="flex-1 overflow-y-auto px-2 space-y-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-black mb-2">
              {chatMessages.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-10">
                  No messages yet. Start the conversation!
                </p>
              )}
              {chatMessages.map(({ id, text, sender }) => (
                <div
                  key={id}
                  className={`p-2 rounded-md max-w-[80%] ${
                    sender === "You"
                      ? "bg-purple-600 text-white self-end ml-auto"
                      : "bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white self-start"
                  }`}
                >
                  <span className="font-semibold">{sender}:</span> {text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message and press Enter"
              className="resize-none rounded-md border border-gray-300 dark:border-zinc-700 p-2 mb-2 bg-white dark:bg-black text-gray-900 dark:text-white"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
            >
              Send
            </button>
          </div>

          {/* Feedback Box */}
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Private Notes</h2>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Only visible to interviewer"
              className="w-full resize-none bg-white dark:bg-black text-gray-800 dark:text-white border border-gray-300 dark:border-zinc-700 rounded-md p-3 text-sm"
              rows={5}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
