import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { getMyQuestions } from "../services/questionService";

export default function MyQuestionsPage() {
  const { token } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await getMyQuestions(token);
        setQuestions(data);
      } catch (error) {
        console.error("Ошибка загрузки моих вопросов:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [token]);

  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.content.toLowerCase().includes(query)
      );
    }

    if (filter === "noAnswers") {
      result = result.filter((q) => q.answersCount === 0);
    }

    if (filter === "answered") {
      result = result.filter((q) => q.answersCount > 0);
    }

    return result;
  }, [questions, search, filter]);

  return (
    <MainLayout>
      <div className="page-top">
        <h1>Мои вопросы</h1>
        <p className="page-subtitle">
          Здесь отображаются все вопросы, которые вы создали.
        </p>
      </div>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Поиск по заголовку или описанию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="toolbar-input"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="toolbar-select"
        >
          <option value="all">Все</option>
          <option value="noAnswers">Без ответов</option>
          <option value="answered">С ответами</option>
        </select>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : filteredQuestions.length === 0 ? (
        <div className="empty-box">
          <p>Подходящих вопросов не найдено.</p>
        </div>
      ) : (
        <div className="questions-list">
          {filteredQuestions.map((q) => (
            <Link to={`/questions/${q._id}`} key={q._id} className="question-card">
              <h3>{q.title}</h3>
              <p>{q.content.slice(0, 120)}...</p>

              <div className="question-meta">
                <span>Ответов: {q.answersCount}</span>
                <span>
                  {new Date(q.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </MainLayout>
  );
}