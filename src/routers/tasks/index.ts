import express from 'express';
import {listTasksByProjectId, saveTask} from "../../controllers/tasks";

const router = express.Router();

router.get('', listTasksByProjectId);
router.post('', saveTask);

export default router;
