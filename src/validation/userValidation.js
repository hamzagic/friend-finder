import { check } from 'express-validator';

// todo: add special char match
export const userInputValidation = [
    check('email', 'Invalid email address').isEmail().escape(),
    check('username', 'Username must be at least 3 characters').isLength({ min: 3 }).escape(),
    check('password').isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches('[0-9]').withMessage('Password must contain at least one number')
    .matches('[a-z]').withMessage('Password must have at least one lowercase character')
    .matches('[A-Z]').withMessage('Password must have at least one uppercase character')
    // .matches('[!@#$%&*-_]').withMessage('Password must have at least one special character')
    .trim().escape()
];

export const userEmailValidation = [
    check('email', 'Invalid email address').isEmail().escape(),
];

export const userPasswordValidation = [
    check('password').isLength({ min: 6 }).trim().escape()
];

export const userLoginValidation = [
    check('email', 'Invalid email address').isEmail().escape(),
    check('password').trim().isLength({ min: 1 }).escape()
]
