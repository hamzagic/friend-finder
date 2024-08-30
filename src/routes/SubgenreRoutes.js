import express from 'express';
const router = express.Router();

import { create } from '../controllers/SubgenreController.js';
import { hasRole } from '../access/userRole.js';

router.post('/subgenre', hasRole(['admin']), create);

export default router;