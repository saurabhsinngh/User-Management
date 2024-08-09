const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


exports.protect = async (req, res, next) => {
    try {
        let accToken = req.header('Authorization')

        if (!accToken) {
            res.status(400).json({ status_code: 400, message: `Auth token is required` });
        }

        const setToken = accToken.split(' ')
        const token = setToken[1];

        if (!token) {
          console.log("Token cannot be null")
          res.status(400).json({ status_code: 400, message: `Token is required` });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ status_code: 404, message: 'User not found' });
        }
        req.userInfo = user;
        next();
    } catch (err) {
        console.log("Error is::", err)
        res.status(401).json({ status_code: 401, message: 'Please authenticated user details.' });
    }
};
