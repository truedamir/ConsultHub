import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { createQuestion } from "../services/questionService";
import { useNavigate } from "react-router-dom";

export default function CreateQuestionPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createQuestion(form, token);

    navigate(`/questions/${res.question._id}`);
  };

  return (
    <MainLayout>
      <h1>Создать вопрос</h1>

      <form onSubmit={handleSubmit} className="form-card">
        <input
          placeholder="Заголовок"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Описание"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button className="btn">Создать</button>
      </form>
    </MainLayout>
  );
}