const jwt = require('jsonwebtoken');
const User = require('../Models/UserSchema');

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Access Denied');
    }
    const token = authHeader.split(' ')[1];
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.userId).select('-password');
        if (!user) {
            return res.status(404).send('User not found');
        }
        req.user = {
            _id: user._id,   
            username: user.username,
            email: user.email
        };
        next();
    } catch (error) {
        console.error(error);
        res.status(400).send('Invalid Token');
    }
};
