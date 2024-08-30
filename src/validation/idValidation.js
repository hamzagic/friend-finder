import { check } from 'express-validator';

export const idValidation = [
    check('id').trim().notEmpty().escape()
];
