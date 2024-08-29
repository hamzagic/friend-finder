import express from 'express';
const router = express.Router();

import { create } from '../controllers/GenreController.js';

router.post('/genre', create);

export default router;