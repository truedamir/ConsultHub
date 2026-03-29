import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { getQuestionById, updateQuestion } from "../services/questionService";

export default function EditQuestionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "open",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const data = await getQuestionById(id);

        const currentUserId = user?.id || user?._id;
        const authorId = data.author?._id || data.author?.id;

        if (currentUserId !== authorId) {
          navigate(`/questions/${id}`);
          return;
        }

        setForm({
          title: data.title || "",
          content: data.content || "",
          status: data.status || "open",
        });
      } catch (error) {
        console.error("Ошибка загрузки вопроса:", error);
        setMessage("Не удалось загрузить вопрос");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadQuestion();
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateQuestion(id, form, token);
      navigate(`/questions/${id}`);
    } catch (error) {
      console.error("Ошибка обновления вопроса:", error);
      setMessage("Не удалось обновить вопрос");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p>Загрузка...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="form-card">
        <h2>Редактировать вопрос</h2>

        {message && <p className="error-text">{message}</p>}

        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            name="title"
            placeholder="Заголовок"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder="Описание вопроса"
            value={form.content}
            onChange={handleChange}
          />

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="open">Открыт</option>
            <option value="closed">Закрыт</option>
          </select>

          <button type="submit" className="btn">
            Сохранить изменения
          </button>
        </form>
      </div>
    </MainLayout>
  );
}