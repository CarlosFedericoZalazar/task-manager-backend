import express from "express";
import { deleteTask, getAllTask, postNewTask, modifyTaskById } from "../controllers/task_controller.js";

const router = express.Router();

router.get('/', getAllTask);

router.post('/post', postNewTask);

router.put('/put/:id', modifyTaskById)

router.delete('/id/:id', deleteTask)

export default router;
