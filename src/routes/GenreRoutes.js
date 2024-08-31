import express from 'express';
const router = express.Router();
// import { hasRole } from '../access/userRole.js';
import { create } from '../controllers/GenreController.js';

// todo: adjust hasRole function to include as a middleware
router.post('/genre', create);

export default router;