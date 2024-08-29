import { validationResult } from 'express-validator';
import { createTitleService } from '../services/TitleService.js';

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const { name, subject, genre, subgenre, description } = req.body;

  const result = await createTitleService(name, subject, genre, subgenre, description);
  
  if(!result.success) {
    return res.status(400).json({ success: false, data: result.error });
  }
  
  return res.status(201).json({ success: true, data: subject.error });
}