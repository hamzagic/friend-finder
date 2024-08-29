import express from 'express';
const router = express.Router();

import { create } from '../controllers/StarController.js';

router.post('/star', create);

export default router;