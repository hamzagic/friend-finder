import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createVerifyToken } from '../utils/TokenUtil.js';
import { sendEmail, resetPassword } from './EmailService.js';

dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const createService = async (email, username, password) => {
    // create token to verify account
    try {
        const token = createVerifyToken();
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = new User({ email, username, password: hashedPassword, token, attempts: 0 });
        try {
            await sendEmail(email, token);
            await user.save();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    } catch (e) {
        console.log(e.message);
        return { success: false, error: e.message };
    }
}

export const getService = async (id) => {
    try {
        const user = await User.findById(new ObjectId(id)).select('-password');
        if (user) {
            return {
                success: true, data: user
            }
        }
    } catch (e) {
        return { success: false, error: e.message };
    }
}

export const loginService = async (email, password) => {
    console.log(email);
        try {
            const user = await User.findOne({ email: email });
            const currentDate = new Date();
            const minTimeAllowed = 1 * 60 * 60 * 1000;  // 1 hour
            const oneHourAgo = new Date(currentDate.getTime() - minTimeAllowed);
            if (user && user.active && (user.attempts < 3 || user.lastAttempt < oneHourAgo)) {
                const hashedPassword = bcrypt.compareSync(password, user.password);
                if (!hashedPassword && user.lastAttempt < oneHourAgo) {
                    console.log('one');
                    user.attempts = 1;
                    user.lastAttempt = new Date();
                    user.save();
                    return { success: false, message: 'Invalid Credentials', status: 400 }
                }

                if (!hashedPassword && user.attempts < 3) {
                    console.log('two');
                    user.attempts += 1;
                    user.lastAttempt = new Date();
                    user.save();
                    return { success: false, message: 'Invalid Credentials', status: 400 }
                }
    
                const token = jwt.sign({ email, id: new ObjectId(user._id) }, process.env.TOKEN_SECRET, { expiresIn: '1 day' });
                user.attempts = 0;
                user.save();
                return { success: true, token: token, status: 200 }
            } else if(user && user.active && user.attempts >= 3) {
                return { success: false, error: 'Account temporarily blocked. Check again in an hour.', status: 400 }
            } else {
                return { success: false, error: 'Invalid credentials', status: 400 }
            }
        } catch (e) {
            return { success: false, error: e.message, status: 400 };
        }
}

export const authenticate = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                resolve({ success: false, message: 'Invalid token' });
            } else {
                resolve({ success: true, user });
            }
        });
    });
}

export const findById = async (id) => {
    try {
        const user = await User.findById(new ObjectId(id)).select('-password');
        if (!user) return false;
        return user;
    } catch (e) {
        return { error: e.message }
    }
}

export const updatePasswordService = async (id, password, newPassword) => {
    try {
        const user = await User.findById(new ObjectId(id));
        const hashedPassword = bcrypt.compareSync(password, user.password);

        if (!hashedPassword) {
            return { success: false, message: 'Invalid Current Password' }
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const newHashedPassword = bcrypt.hashSync(newPassword, salt);

        user.password = newHashedPassword;
        await user.save();
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

export const updateEmailService = async (id, email) => {
    try {
        // email must be unique
        const user = await User.findById(new ObjectId(id));
        console.log(user)
        user.email = email;
        user.updated = new Date();
        await user.save();
        const token = jwt.sign({ email, id: new ObjectId(user._id) }, process.env.TOKEN_SECRET, { expiresIn: '1 day' });

        return { success: true, token: token };
    } catch (e) {
        console.log(e.message)
        return { success: false, status: 400, error: e.message };
    }
}

export const toggleService = async (id) => {
    try {
        const user = await User.findById(new ObjectId(id));
        user.active = !user.active;
        await user.save();
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

export const verifyEmailRegister = async (token, email) => {
    const update = {
        verified: true,
        token: null
    }
    try {
        const user = await User.findOneAndUpdate({ token: token, email: email }, update, { new: true });
        if (user) {
            return { success: true }
        } else {
            return { success: false, error: 'No user found' }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const forgotPasswordService = async (email) => {
    const token = createVerifyToken();
    const update = {
        forgot: token,
        updated: new Date()
    }

    try {
        const user = await User.findOneAndUpdate({ email: email }, update);
        if (user) {
            await resetPassword(email, token);
            return { success: true }
        } else {
            return { success: true }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const resetPasswordService = async (token, email, password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const user = await User.findOne({ forgot: token, email: email });
        if (user) {
            user.forgot = null;
            user.updated = new Date();
            user.password = hashedPassword;
            user.save();
            return { success: true }
        } else {
            return { success: false, error: 'no user found' }
        }
    } catch (error) {
        return { success: false, error: error.message }
    }
}