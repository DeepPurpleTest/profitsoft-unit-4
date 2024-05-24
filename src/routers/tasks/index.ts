import express from 'express';
import {countsTasks, listTasksByProjectId, saveTask} from "src/controllers/tasks";

const router = express.Router();

router.get('', listTasksByProjectId);
router.post('', saveTask);
router.post('/_counts', countsTasks);

export default router;
