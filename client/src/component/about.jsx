import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-500">
      {/* Navbar */}
      <header className="w-full px-8 py-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-black">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="CodeFun Logo" className="w-10 h-10" />
          <span className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 tracking-wide">
            CodeFun
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-12 md:py-20 max-w-5xl mx-auto space-y-16">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-purple-600 dark:text-purple-400 mb-6">
            About CodeFun
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            CodeFun is a real-time collaborative coding platform designed for developers, educators, and learners.
            Whether you're pair programming, mentoring, or working on a team project, CodeFun makes collaboration seamless and intuitive.
          </p>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-4">Key Features</h2>
          <ul className="text-gray-700 dark:text-gray-400 text-lg space-y-2 list-disc list-inside max-w-2xl mx-auto">
            <li>Real-time collaborative code editing</li>
            <li>Multi-language syntax highlighting</li>
            <li>Room-based sessions with secure IDs</li>
            <li>Responsive and intuitive UI</li>
            <li>Live user activity indicators</li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Tech Stack</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">CodeFun is built using the modern web ecosystem:</p>
          <p className="text-purple-600 dark:text-purple-400 text-lg font-medium mt-2">
            React · Tailwind CSS · Socket.IO · Express.js · Node.js · Monaco Editor
          </p>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-4">Use Cases</h2>
          <ul className="text-gray-700 dark:text-gray-400 text-lg space-y-2 list-disc list-inside max-w-2xl mx-auto">
            <li>Remote pair programming</li>
            <li>Live coding interviews</li>
            <li>Mentorship and tutoring sessions</li>
            <li>Hackathons and coding events</li>
            <li>Student collaboration in real-time</li>
          </ul>
        </section>

        {/* Vision */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            We're building a developer-first experience with rich collaboration tools. Future features include
            real-time chat, AI pair-programming, code execution, and more — all in one place.
          </p>
        </section>

        {/* Contact Info */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact the Developer</h2>
          <p className="text-gray-700 dark:text-gray-400 text-lg">
            <span className="block">Name: <span className="text-purple-600 dark:text-purple-400 font-medium">Harsh Tiwari</span></span>
            <span className="block">Email: <span className="text-purple-600 dark:text-purple-400">harshtiwari2022b031@gmail.com</span></span>
            <span className="block">Phone: <span className="text-purple-600 dark:text-purple-400">+91 6307166755</span></span>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} CodeFun · Built by <span className="text-purple-600 dark:text-purple-400">Harsh</span>
      </footer>
    </div>
  );
}
