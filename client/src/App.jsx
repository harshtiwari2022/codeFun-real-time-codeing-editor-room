import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./component/about";
import Editor from "./component/Editor";
import Home from "./component/home";
import Interview from "./component/Interview";
import Student from "./component/Student";
import InterviewRoom from "./component/InterviewRoom";





export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
        <Route path="/editor/:roomId" element={<Editor />} />
        <Route path="/about" element={<About />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/student" element={<Student />} />
        <Route path="/interview/:roomId" element={<InterviewRoom />} />
      </Routes>
    </Router>
  );
}
