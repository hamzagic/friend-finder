import express from 'express';
const router = express.Router();

import { create } from '../controllers/SubjectController.js';
import { hasRole } from '../access/userRole.js';

router.post('/subject', hasRole(['admin']), create);

export default router;