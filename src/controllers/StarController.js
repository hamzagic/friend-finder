import { validationResult } from 'express-validator';
import { createStarService } from '../services/StarService.js';

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const { name, subject, genre, subgenre, title, description } = req.body;

  const result = await createStarService(name, subject, genre, subgenre, title, description);
  
  if(!result.success) {
    return res.status(400).json({ success: false, data: result.error });
  }
  
  return res.status(201).json({ success: true, data: subject.error });
}