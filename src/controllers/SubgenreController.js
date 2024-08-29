import { validationResult } from 'express-validator';
import { createSubgenreService } from '../services/SubgenreService.js';

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const { name, subject, genre, description } = req.body;

  const result = await createSubgenreService(name, subject, genre, description);
  
  if(!result.success) {
    return res.status(400).json({ success: false, data: result.error });
  }
  
  return res.status(201).json({ success: true, data: subject.error });
}