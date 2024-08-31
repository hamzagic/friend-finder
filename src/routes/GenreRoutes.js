import express from 'express';
const router = express.Router();
import { hasRole } from '../access/userRole.js';
import { create } from '../controllers/GenreController.js';

router.post('/genre', accessToken, hasRole(['admin']), create);

export default router;