import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import avatar from "../assets/avatar.png";
import liquid from "../assets/liquid.png";
import {
  createAnswer,
  deleteAnswer,
  deleteQuestion,
  getAnswersByQuestion,
  getQuestionById,
} from "../services/questionService";
import { useAuth } from "../context/AuthContext";

export default function QuestionPage() {
  const { id } = useParams();
  const { user, token, isAuthenticated } = useAuth();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const [questionData, answersData] = await Promise.all([
        getQuestionById(id),
        getAnswersByQuestion(id),
      ]);

      setQuestion(questionData);
      setAnswers(
        answersData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (error) {
      console.error("Ошибка загрузки вопроса:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleDeleteQuestion = async () => {
    try {
      await deleteQuestion(id, token);
      window.location.href = "/";
    } catch (error) {
      console.error("Ошибка удаления вопроса:", error);
    }
  };

  const handleCreateAnswer = async (e) => {
    e.preventDefault();

    if (!answerText.trim()) return;

    if (question?.status === "closed") {
      alert("Вопрос закрыт");
      return;
    }

    try {
      await createAnswer(id, { content: answerText }, token);
      setAnswerText("");
      loadData();
    } catch (error) {
      console.error("Ошибка создания ответа:", error);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      await deleteAnswer(answerId, token);
      loadData();
    } catch (error) {
      console.error("Ошибка удаления ответа:", error);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="empty-box">
          <p className="loading">Загрузка вопроса...</p>
        </div>
      </MainLayout>
    );
  }

  if (!question) {
    return (
      <MainLayout>
        <div className="empty-box">
          <p>Вопрос не найден</p>
        </div>
      </MainLayout>
    );
  }

  const currentUserId = user?.id || user?._id;
  const authorId = question.author?._id || question.author?.id;
  const isOwner = currentUserId === authorId;

  return (
    <MainLayout>
      <div className="question-page">
        <img src={liquid} className="bg-liquid" alt="" />

        <div className="question-full">
          <div className="question-head">
            <h1>{question.title}</h1>

            <span className={`status ${question.status}`}>
              {question.status === "open" ? "Открыт" : "Закрыт"}
            </span>
          </div>

          <p>{question.content}</p>

          <div className="question-meta">
            <span>
              Автор: {question.author?.firstName} {question.author?.lastName}
            </span>
            <span>Ответов: {answers.length}</span>
            <span>
              Создан: {new Date(question.createdAt).toLocaleString()}
            </span>
          </div>

          {isOwner && (
            <div className="owner-actions">
              <Link to={`/questions/${id}/edit`} className="btn">
                Редактировать
              </Link>

              <button onClick={handleDeleteQuestion} className="btn danger-btn">
                Удалить вопрос
              </button>
            </div>
          )}
        </div>

        <div className="answers-section">
          <h2>Ответы</h2>

          {isAuthenticated ? (
            question.status === "open" ? (
              <form onSubmit={handleCreateAnswer} className="form-card answer-form">
                <textarea
                  placeholder="Напишите свой ответ..."
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                />
                <button type="submit" className="btn">
                  Добавить ответ
                </button>
              </form>
            ) : (
              <div className="empty-box">
                Вопрос закрыт. Новые ответы добавлять нельзя.
              </div>
            )
          ) : (
            <p>Чтобы оставить ответ, нужно войти в аккаунт.</p>
          )}

          {answers.length === 0 ? (
            <div className="empty-box">Пока нет ответов. Будь первым 👇</div>
          ) : (
            <div className="answers-list">
              {answers.map((answer) => {
                const answerOwnerId = answer.author?._id || answer.author?.id;
                const isAnswerOwner = currentUserId === answerOwnerId;

                return (
                  <div key={answer._id} className="answer-card modern">
                    <p>{answer.content}</p>

                    <div className="answer-meta modern">
                      <div className="answer-user">
                        <img src={avatar} className="avatar" alt="avatar" />
                        <span>
                          {answer.author?.firstName} {answer.author?.lastName}
                        </span>
                      </div>

                      <span>
                        {new Date(answer.createdAt).toLocaleString()}
                      </span>

                      {isAnswerOwner && (
                        <button
                          onClick={() => handleDeleteAnswer(answer._id)}
                          className="mini-delete-btn"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}