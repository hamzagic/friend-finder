import express from 'express';
const router = express.Router();

import { create } from '../controllers/SubgenreController.js';

router.post('/subgenre', create);

export default router;