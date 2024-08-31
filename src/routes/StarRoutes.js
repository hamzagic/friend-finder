import express from 'express';
const router = express.Router();

import { create } from '../controllers/StarController.js';
import { hasRole } from '../access/userRole.js';
import { accessToken } from '../middlewares/authMiddleware.js';

router.post('/star', accessToken, hasRole(['admin']), create);

export default router;