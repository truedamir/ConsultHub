import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

export const createAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const { questionId } = req.params;

    if (!content) {
      return res.status(400).json({
        message: "Введите текст ответа",
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Вопрос не найден",
      });
    }

    const answer = await Answer.create({
      content,
      author: req.user._id,
      question: questionId,
    });

    question.answersCount += 1;
    await question.save();

    const populatedAnswer = await Answer.findById(answer._id).populate(
      "author",
      "firstName lastName email role"
    );

    res.status(201).json({
      message: "Ответ добавлен",
      answer: populatedAnswer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка сервера при добавлении ответа",
      error: error.message,
    });
  }
};

export const getAnswersByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "firstName lastName email role")
      .sort({ createdAt: -1 });

    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка сервера при получении ответов",
      error: error.message,
    });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;

    const answer = await Answer.findById(id);

    if (!answer) {
      return res.status(404).json({
        message: "Ответ не найден",
      });
    }

    if (answer.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Вы можете удалять только свои ответы",
      });
    }

    await Question.findByIdAndUpdate(answer.question, {
      $inc: { answersCount: -1 },
    });

    await answer.deleteOne();

    res.status(200).json({
      message: "Ответ удалён",
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка сервера при удалении ответа",
      error: error.message,
    });
  }
};