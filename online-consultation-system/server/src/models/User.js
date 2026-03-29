import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Имя обязательно"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Фамилия обязательна"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email обязателен"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Пароль обязателен"],
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;