import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getMyQuestions,
  getQuestionById,
  updateQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/my", protect, getMyQuestions);
router.get("/:id", getQuestionById);
router.post("/", protect, createQuestion);
router.put("/:id", protect, updateQuestion);
router.delete("/:id", protect, deleteQuestion);

export default router;