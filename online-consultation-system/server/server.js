import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import questionRoutes from "./src/routes/questionRoutes.js";
import answerRoutes from "./src/routes/answerRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/answers", answerRoutes);

app.get("/", (req, res) => {
  res.send("API работает 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB подключена ✅"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});