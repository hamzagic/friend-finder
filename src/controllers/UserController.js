import { validationResult } from 'express-validator';

import {
    createService,
    updateEmailService,
    updatePasswordService,
    toggleService,
    getService,
    loginService,
    authenticate,
    findById,
    verifyEmailRegister,
    forgotPasswordService,
    resetPasswordService
} from '../services/UserService.js';

export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
    }

    const { email, username, password } = req.body;

    const user = await createService(email, username, password);
    return res.json(user);
}

export const find = async (req, res) => {
    const id = req.params.id.trim();
    if (id) {
        const user = await getService(id);
        if (user.success === true) {
            res.status(201).json({ success: true, data: user.data });
        } else {
            res.status(400).json({ success: false, error: user.error });
        }
    }
}

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await loginService(email, password);
    return res.json(user);
}

export const getById = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.json({ success: false, message: 'No token found' });
    const auth = await authenticate(token);
    res.json({ data: auth })
}

// validate inputs
export const accessToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('auth', token);
    if (!token) {
        res.status(401).json({ success: false, error: 'No token found' });
    } else {
        const auth = await authenticate(token);
        if (auth.success === true) {
            req.user = auth.user;
            next();
        } else {
            res.status(401).json({ success: false, error: 'Invalid token' });;
        }
    }
}

export const emailVerification = async (req, res) => {
    const path = require('path');
    const token = req.query.token;
    const email = req.query.email;

    console.log(req.query.email, req.query.token)

    if (!token || !email) {
        console.log('no token, no email');
        return res.redirect('https://www.divinaarcana.dev/verification?ok=false');
        // return res.sendFile(path.join(__dirname + '../../public/email-verify-error.html'));
    }
    
    const emailService = await verifyEmailRegister(token, email);
    if (emailService.success === true) {
        return res.redirect('https://www.divinaarcana.dev/verification?ok=true');
        // return res.sendFile(path.join(__dirname + '../../public/email-verify.html'));
    } else {
        console.log(emailService.error)
        return res.redirect('https://www.divinaarcana.dev/verification?ok=false');
        // return res.sendFile(path.join(__dirname + '../../public/email-verify-error.html'));
    }
}

export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
    }

    const id = req.params.id;
    const { email, username } = req.body;

    const user = await updateEmailService(id, email, username);
    if (user.success === true) {
        res.json({ success: true, token: user.token });
    } else {
        res.json({ success: false, status: user.status, error: user.error });
    }
}

export const updatePassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
    }

    // todo: check if email already exists
    const id = req.params.id;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    const user = await updatePasswordService(id, password, newPassword);
    if (user.success === true) {
        res.json({ success: true, status: 200 });
    } else {
        res.json({ success: false, error: user.message, status: 400 });
    }
}

export const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const forgotService = await forgotPasswordService(email);
    if (forgotService.success === true) {
        res.json({ success: true, status: 200 });
    } else {
        res.json({ success: false, status: 400, error: forgotService.error });
    }
}

export const resetPasswordPage = (req, res) => {
    const path = require('path');
    const token = req.query.token;

    if (!token) {
        console.log('no token')
        return res.sendFile(path.join(__dirname + '../../public/email-verify-error.html'));
    }
   
    return res.sendFile(path.join(__dirname + '../../public/new-password.html'));
}

export const resetPassword = async (req, res) => {
    const path = require('path');
    const token = req.body.token;
    const email = req.body.email;
    const password = req.body.password;

    if (!token) {
        console.log('no token');
        return res.json({ success: false, error: 'No token found' });
        // return res.sendFile(path.join(__dirname + '../../public/email-verify-error.html'));
    }
    
    const resetService = await resetPasswordService(token, email, password);
    if (resetService.success === true) {
        return res.json({ success: true })
    } else {
        console.log(resetService)
        return res.json({ success: false, error: resetService.error });
    }
}

export const del = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
    }

    const id = req.params.id;

    const userValidation = await validateUserByIdToken(id, req);
    if (userValidation) {
        const user = await toggleService(id);
        if (user.success === true) {
            return res.json({ success: true, status: 200 });
        } else {
            return res.json({ success: false, error: user.message, status: 400 });
        }
    } else {
        return res.json({ success: false, error: 'Invalid account', status: 400 }); 
    }
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    // if (!token) return false;
    // const auth = await authenticate(token);
    // if (auth.user.id !== id) {
    //     return res.json({ success: false, error: 'Token not valid' });
    // }
}

const validateUserByIdToken = async (id, req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return false;
    const auth = await authenticate(token);
    if (auth.user.id !== id) {
        return false;
    }

    return true;
}