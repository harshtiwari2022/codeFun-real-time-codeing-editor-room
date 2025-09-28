import { useState } from "react";
import axios from "axios";

export default function CodeReview() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) return alert("Please enter some code first!");
    setLoading(true);
    setReview("");
    try {
      const res = await axios.post("http://localhost:5001/api/ai/get-review", { code });
      setReview(res.data.review);
    } catch (err) {
      console.error(err);
      setReview("❌ Failed to fetch code review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-[#0d1117] text-gray-200">
      {/* Left Side - Code Input */}
      <div className="w-1/2 p-6 flex flex-col">
        <h2 className="text-2xl font-semibold mb-3 text-blue-400">
          Submit Your Code
        </h2>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your code here..."
          className="w-full flex-1 p-4 border border-gray-700 rounded-xl
                     font-mono text-sm resize-none shadow-sm
                     bg-[#161b22] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleReview}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl
                     hover:bg-blue-500 active:scale-95 transition disabled:opacity-50 shadow-lg"
        >
          {loading ? "⚡ Reviewing..." : "🚀 Review Code"}
        </button>
      </div>

      {/* Right Side - AI Review Output */}
      <div className="w-1/2 p-6 border-l border-gray-700 flex flex-col">
        <h2 className="text-2xl font-semibold mb-3 text-green-400">
          AI Code Review
        </h2>
        <div
          className="bg-[#161b22] flex-1 p-4 rounded-xl shadow
                     overflow-y-auto whitespace-pre-wrap font-mono text-sm text-gray-100"
        >
          {review
            ? review
            : "💡 No review yet. Submit your code to get AI feedback."}
        </div>
      </div>
    </div>
  );
}
