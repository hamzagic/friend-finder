import express from 'express';
const router = express.Router();

import { create } from '../controllers/SubgenreController.js';
import { hasRole } from '../access/userRole.js';
import { accessToken } from '../middlewares/authMiddleware.js';

router.post('/subgenre', accessToken, hasRole(['admin']), create);

export default router;