import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateQuestionPage from "./pages/CreateQuestionPage";
import QuestionPage from "./pages/QuestionPage";
import MyQuestionsPage from "./pages/MyQuestionsPage";
import EditQuestionPage from "./pages/EditQuestionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateQuestionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-questions"
        element={
          <ProtectedRoute>
            <MyQuestionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/questions/:id/edit"
        element={
          <ProtectedRoute>
            <EditQuestionPage />
          </ProtectedRoute>
        }
      />

      <Route path="/questions/:id" element={<QuestionPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}