import Question from "../models/Question.js";

export const createQuestion = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Заполните заголовок и описание вопроса",
      });
    }

    const question = await Question.create({
      title,
      content,
      tags: tags || [],
      author: req.user._id,
    });

    const populatedQuestion = await Question.findById(question._id).populate(
      "author",
      "firstName lastName email role"
    );

    res.status(201).json({
      message: "Вопрос успешно создан",
      question: populatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка сервера при создании вопроса",
      error: error.message,
    });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("author", "firstName lastName email role")
      .sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка сервера при получении вопросов",
      error: error.message,
    });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "author",
      "firstName lastName email role"
    );

    if (!question) {
      return res.status(404).json({
        message: "Вопрос не найден",
      });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка сервера при получении вопроса",
      error: error.message,
    });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Вопрос не найден",
      });
    }

    if (question.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Вы можете редактировать только свои вопросы",
      });
    }

    question.title = title ?? question.title;
    question.content = content ?? question.content;
    question.tags = tags ?? question.tags;
    question.status = status ?? question.status;

    const updatedQuestion = await question.save();

    const populatedQuestion = await Question.findById(updatedQuestion._id).populate(
      "author",
      "firstName lastName email role"
    );

    res.status(200).json({
      message: "Вопрос обновлён",
      question: populatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка сервера при обновлении вопроса",
      error: error.message,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Вопрос не найден",
      });
    }

    if (question.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Вы можете удалять только свои вопросы",
      });
    }

    await question.deleteOne();

    res.status(200).json({
      message: "Вопрос удалён",
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка сервера при удалении вопроса",
      error: error.message,
    });
  }
 
};
export const getMyQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ author: req.user._id })
      .populate("author", "firstName lastName email role")
      .sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка сервера при получении ваших вопросов",
      error: error.message,
    });
  }
};