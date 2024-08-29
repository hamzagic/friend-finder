import express from 'express';
const router = express.Router();

import { create } from '../controllers/TitleController.js';

router.post('/title', create);

export default router;