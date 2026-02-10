import express from "express";
import { deleteTask, getAllTask, postNewTask, modifyTaskById, toggleTask } from "../controllers/task_controller.js";
import {normalizeData} from "../middlewares/middleware_tasks.js"

const router = express.Router();

router.get('/', getAllTask);

router.post('/post', normalizeData, postNewTask);

router.put('/:id', normalizeData, modifyTaskById);

router.put('/toggle/:id', toggleTask);

router.delete('/id/:id', deleteTask);

export default router;
