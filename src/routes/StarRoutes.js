import express from 'express';
const router = express.Router();

import { create } from '../controllers/StarController.js';
import { hasRole } from '../access/userRole.js';

router.post('/star', accessToken, hasRole(['admin']), create);

export default router;