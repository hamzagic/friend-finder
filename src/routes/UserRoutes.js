import express from 'express';
const router = express.Router();

import { accessToken } from '../controllers/UserController.js';
import { hasRole } from '../access/userRole.js';

import { userInputValidation, userEmailValidation, userPasswordValidation, userLoginValidation } from '../validation/userValidation.js';
import { idValidation } from '../validation/idValidation.js';
import { 
    create, 
    updatePassword, 
    update, 
    del, 
    find, 
    login,
    getById,
    emailVerification,
    forgotPassword,
    resetPassword,
    resetPasswordPage 
} from '../controllers/UserController.js';

router.use((req, res, next) => {
    next();
});

router.post('/user', userInputValidation, create);
router.post('/user/login', userLoginValidation, login);
router.post('/user/reset', resetPassword);
router.post('/user/forgot', forgotPassword);
router.post('/user/:id', userEmailValidation,accessToken, update);
router.post('/userpwd/:id', userPasswordValidation, updatePassword);
router.post('/user/del/:id', idValidation, accessToken, del);
router.post('/user/find/:id', idValidation, accessToken, hasRole(['admin']), find);
router.post('/user-profile', getById);
router.get('/user/verification', emailVerification);
router.get('/user/reset-page', resetPasswordPage);

export default router;