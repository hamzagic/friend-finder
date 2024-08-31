import express from 'express';
const router = express.Router();

import { create } from '../controllers/SubjectController.js';
// import { hasRole } from '../access/userRole.js';

// todo: adjust hasRole function to include as a middleware
router.post('/subject', create);

export default router;