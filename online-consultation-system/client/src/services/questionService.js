import axios from "axios";

const QUESTIONS_API = "http://localhost:5000/api/questions";
const ANSWERS_API = "http://localhost:5000/api/answers";

export const getAllQuestions = async () => {
  const res = await axios.get(QUESTIONS_API);
  return res.data;
};

export const getQuestionById = async (id) => {
  const res = await axios.get(`${QUESTIONS_API}/${id}`);
  return res.data;
};

export const createQuestion = async (data, token) => {
  const res = await axios.post(QUESTIONS_API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteQuestion = async (id, token) => {
  const res = await axios.delete(`${QUESTIONS_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAnswersByQuestion = async (questionId) => {
  const res = await axios.get(`${ANSWERS_API}/question/${questionId}`);
  return res.data;
};

export const createAnswer = async (questionId, data, token) => {
  const res = await axios.post(`${ANSWERS_API}/question/${questionId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteAnswer = async (answerId, token) => {
  const res = await axios.delete(`${ANSWERS_API}/${answerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getMyQuestions = async (token) => {
  const res = await axios.get(`${QUESTIONS_API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const updateQuestion = async (id, data, token) => {
  const res = await axios.put(`${QUESTIONS_API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};