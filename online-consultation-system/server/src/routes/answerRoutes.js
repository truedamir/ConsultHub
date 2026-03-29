import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createAnswer,
  deleteAnswer,
  getAnswersByQuestion,
} from "../controllers/answerController.js";

const router = express.Router();

router.get("/question/:questionId", getAnswersByQuestion);
router.post("/question/:questionId", protect, createAnswer);
router.delete("/:id", protect, deleteAnswer);

export default router;