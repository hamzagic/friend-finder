import { validationResult } from 'express-validator';
import { createSubjectService } from '../services/SubjectService.js';

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const { name, description } = req.body;
  if(!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const result = await createSubjectService(name, description);
  
  if(!result.success) {
    return res.status(400).json({ success: false, data: result.error });
  }
  
  return res.status(201).json({ success: true, data: result });
}