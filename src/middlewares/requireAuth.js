const jwt = require('jsonwebtoken');
const usermodel = require('../models/user.model');

const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: 'Access denied,no token' });

    const token = authHeader.slice('Bearer '.length).trim();
    if (!token) {
        return res.status(401).json({ message: 'Access denied,no token' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(payload.userid);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
        req.user = user;
        return next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' ||
            error.name === 'TokenExpiredError' ||
            error.name === 'NotBeforeError') {
            return res.status(401).json({ message: 'Invalid  or expired token' });
        }
        return next(error);
    }
};
module.exports = requireAuth;