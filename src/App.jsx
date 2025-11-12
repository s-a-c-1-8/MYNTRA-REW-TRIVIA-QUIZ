import { Routes, Route, Navigate } from "react-router-dom";
import QuizGame from "./MyntraQuizGame";

export default function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<QuizGame key="default" />} />

      {/* Second route (separate instance) */}
      <Route path="/two" element={<QuizGame key="two" />} />

      {/* Redirect any unknown path to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
