"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const todoRouter_1 = __importDefault(require("./routes/todoRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({ message: "TODO backend is running 🚀" });
});
app.use("/api/todos", todoRouter_1.default);
const MONGODB_URI = process.env.MONGODB_URI;
async function startServer() {
    try {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI 환경 변수가 설정되어 있지 않습니다.");
        }
        await mongoose_1.default.connect(MONGODB_URI);
        console.log("몽고디비 연결성공");
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("몽고디비 연결 실패:", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map