import User from '../models/User.js';

export const hasRole = (roles) => {
    return async (req, res, next) => {
        const user = await User.findOne({email: req.user.emails});
        console.log(user);
        if(user) {
            if (!user || !roles.includes(user.role)) {
                return res.status(403).send({ success: false, message: 'Access denied.' });
            }
            next();
        } else {
            console.log('nope');
            return res.status(403).send({ success: false, message: 'Invalid user.' });
        }
    }
}
