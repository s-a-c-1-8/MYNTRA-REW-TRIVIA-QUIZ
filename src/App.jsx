import { Routes, Route, Navigate } from "react-router-dom";
import QuizGame from "./MyntraQuizGame";

export default function App() {
  return (
    <Routes>
      <Route path="/one" element={<QuizGame key="one" />} />
      <Route path="/two" element={<QuizGame key="two" />} />
      <Route path="*" element={<Navigate to="/one" replace />} />
    </Routes>
  );
}
