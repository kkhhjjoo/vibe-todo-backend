import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todosRouter from "./routes/todoRouter";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "TODO backend is running 🚀" });
});

app.use("/api/todos", todosRouter);

const MONGODB_URI = process.env.MONGODB_URI;

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI 환경 변수가 설정되어 있지 않습니다.");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("몽고디비 연결성공");

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("몽고디비 연결 실패:", error);
    process.exit(1);
  }
}

startServer();

