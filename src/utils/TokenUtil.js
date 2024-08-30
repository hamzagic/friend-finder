import crypto from 'crypto';

export const createVerifyToken = () => {
    return crypto.randomBytes(64).toString('hex');
}
