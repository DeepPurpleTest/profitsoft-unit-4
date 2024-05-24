import express from 'express';
import tasks from "./tasks";

const router = express.Router();

router.use('/tasks', tasks);

export default router;
