import { validationResult } from 'express-validator';
import { createGenreService } from '../services/GenreService.js';

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const { name, subject, description } = req.body;

  const result = await createGenreService(name, subject, description);
  
  if(!result.success) {
    return res.status(400).json({ success: false, data: result.error });
  }
  
  return res.status(201).json({ success: true, data: subject.error });
}