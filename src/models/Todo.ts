import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, "할일 내용을 입력해 주세요."],
      trim: true,
      maxlength: [500, "할일은 500자 이내로 입력해 주세요."],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo: Model<ITodo> =
  mongoose.models.Todo ?? mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
