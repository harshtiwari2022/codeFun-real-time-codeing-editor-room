import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

export default function InterviewRoom() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [timer, setTimer] = useState(60 * 30); // 30 minutes timer
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Scroll ref for chat (placeholder)
  const chatEndRef = useRef(null);

  useEffect(() => {
    const authEmail = searchParams.get("auth");
    if (authEmail && validateEmail(authEmail)) {
      setEmail(authEmail);
      setAuthenticated(true);
    }
  }, [searchParams]);

  // Timer countdown
  useEffect(() => {
    if (!authenticated) return;
    if (timer === 0) return alert("Interview time is up!");

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [authenticated, timer]);

  const handleManualAuth = () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }
    setIsLoading(true);
    // Simulate async auth validation
    setTimeout(() => {
      setIsLoading(false);
      setAuthenticated(true);
    }, 1000);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!authenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-purple-600">
            Join Interview Room
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email to join room <span className="font-medium">{roomId}</span>
          </p>
          <input
            type="email"
            autoFocus
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleManualAuth}
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg font-semibold transition"
          >
            {isLoading ? "Joining..." : "Join Interview"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-2 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Authenticated interview UI
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-purple-600 cursor-pointer" onClick={() => navigate("/")}>
            codeFun.. Interview
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Room: <span className="font-mono">{roomId}</span></p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Candidate</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
          <p className="mt-1 font-mono text-yellow-500 text-lg">{formatTime(timer)}</p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-grow overflow-hidden p-6 gap-6">
        {/* Left: Code editor placeholder */}
        <section className="flex flex-col flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Code Editor</h2>
          <textarea
            readOnly
            placeholder="Code editor will be here"
            className="flex-grow w-full p-4 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-mono resize-none"
          />
        </section>

        {/* Right sidebar */}
        <aside className="w-80 flex flex-col gap-6">
          {/* Interview question */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Interview Question</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {/* You can replace with dynamic question content */}
              Implement a function to check if a string is a palindrome.
            </p>
          </div>

          {/* Chat placeholder */}
          <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-60">
            <h3 className="text-lg font-semibold mb-2">Chat</h3>
            <div className="flex-grow overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
              {/* Chat messages would appear here */}
              <p className="text-center text-sm text-gray-400 mt-20">
                Chat functionality coming soon...
              </p>
              <div ref={chatEndRef} />
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        &copy; {new Date().getFullYear()} codeFun Interview Platform. All rights reserved.
      </footer>
    </div>
  );
}
