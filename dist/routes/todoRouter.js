"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const Todo_1 = __importDefault(require("../models/Todo"));
const router = (0, express_1.Router)();
router.get("/", async (_req, res) => {
    try {
        const todos = await Todo_1.default.find().sort({ createdAt: -1 });
        res.json(todos);
    }
    catch (error) {
        console.error("할일 목록 조회 실패:", error);
        res.status(500).json({ error: "할일 목록을 불러오지 못했습니다." });
    }
});
router.post("/", async (req, res) => {
    try {
        const { title, completed } = req.body;
        if (!title || typeof title !== "string") {
            res.status(400).json({ error: "할일 내용(title)을 입력해 주세요." });
            return;
        }
        const todo = await Todo_1.default.create({
            title: title.trim(),
            completed: completed === true,
        });
        res.status(201).json(todo);
    }
    catch (error) {
        console.error("할일 생성 실패:", error);
        res.status(500).json({ error: "할일 생성에 실패했습니다." });
    }
});
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ error: "올바른 할일 ID가 아닙니다." });
            return;
        }
        const updateData = {};
        if (typeof title === "string")
            updateData.title = title.trim();
        if (typeof completed === "boolean")
            updateData.completed = completed;
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({
                error: "수정할 내용(title 또는 completed)을 보내 주세요.",
            });
            return;
        }
        const todo = await Todo_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
        if (!todo) {
            res.status(404).json({ error: "해당 할일을 찾을 수 없습니다." });
            return;
        }
        res.json(todo);
    }
    catch (error) {
        console.error("할일 수정 실패:", error);
        res.status(500).json({ error: "할일 수정에 실패했습니다." });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ error: "올바른 할일 ID가 아닙니다." });
            return;
        }
        const todo = await Todo_1.default.findByIdAndDelete(id);
        if (!todo) {
            res.status(404).json({ error: "해당 할일을 찾을 수 없습니다." });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        console.error("할일 삭제 실패:", error);
        res.status(500).json({ error: "할일 삭제에 실패했습니다." });
    }
});
exports.default = router;
//# sourceMappingURL=todoRouter.js.map