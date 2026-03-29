import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getAllQuestions } from "../services/questionService";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getAllQuestions();
      setQuestions(data);
    };
    load();
  }, []);

  return (
    <MainLayout>
      <h1>Все вопросы</h1>

      {questions.length === 0 && <p>Пока нет вопросов</p>}

      <div className="questions-list">
        {questions.map((q) => (
          <Link to={`/questions/${q._id}`} key={q._id} className="question-card">
            <h3>{q.title}</h3>
            <p>{q.content.slice(0, 100)}...</p>
            <span>{q.author?.firstName}</span>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}