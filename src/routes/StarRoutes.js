import express from 'express';
const router = express.Router();

import { create } from '../controllers/StarController.js';
// import { hasRole } from '../access/userRole.js';

// todo: adjust hasRole function to include as a middleware
router.post('/star', create);

export default router;