import express from 'express';
const router = express.Router();

import { create } from '../controllers/SubjectController.js';

router.post('/subject', create);

export default router;