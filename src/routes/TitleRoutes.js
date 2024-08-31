import express from 'express';
const router = express.Router();

import { create } from '../controllers/TitleController.js';
import { hasRole } from '../access/userRole.js';
import { accessToken } from '../middlewares/authMiddleware.js';

router.post('/title', accessToken, hasRole(['admin']), create);

export default router;