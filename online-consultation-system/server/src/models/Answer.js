import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Текст ответа обязателен"],
      trim: true,
      minlength: [5, "Ответ слишком короткий"],
      maxlength: [2000, "Ответ слишком длинный"],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    // ⭐ лайки (как StackOverflow)
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ⭐ выбранный ответ
    isAccepted: {
      type: Boolean,
      default: false,
    },

    // ⭐ редактирование
    isEdited: {
      type: Boolean,
      default: false,
    },

    // ⭐ мягкое удаление (лучше чем delete)
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Answer", answerSchema);