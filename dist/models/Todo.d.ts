import { Document, Model } from "mongoose";
export interface ITodo extends Document {
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Todo: Model<ITodo>;
export default Todo;
//# sourceMappingURL=Todo.d.ts.map