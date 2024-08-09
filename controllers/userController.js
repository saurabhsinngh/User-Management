const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status_code: 400,message: 'Email already exists'});
        }

        const user = new User(req.body);
        let userData = await user.save();

        // Generate a token
        const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, { expiresIn: '15h' });

        let responseData = {
            userData,
            token: token
        }

        res.status(200).json( { status_code: 200, message: 'User created successfully', data: responseData });
    } catch (err) {
        res.status(500).json({ status_code: 500, message: 'Error in user creation', error: err.message });
    }
};

exports.changeUserStatus = async (req, res) => {
    try {
        const users = await User.find();

        const updatedUsers = users.map(user => {
            user.status = user.status === 'active' ? 'inactive' : 'active';
            return user.save();
        });

        await Promise.all(updatedUsers);
        res.status(200).json({ status_code: 200, message: 'User statuses updated successfully' });
    } catch (err) {
        res.status(500).json({ status_code: 500, message: 'Error changing user status', error: err.message });
    }
};


exports.getUserListing = async (req, res) => {
    try {
        const { week_number } = req.query;
        let query = {};

        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        if (week_number) {
            const days = week_number.split(',').map(index => dayName[index]);
            query.register_at = { $in: days };
        }

        // Optimized query to fetch only the necessary user data
        const users = await User.find(query).select('name email register_at');

        let responseData = {};

        users.forEach(user => {
            const day = user.register_at;
            if (!responseData[day]) {
                responseData[day] = [];
            }
            responseData[day].push({
                name: user.name,
                email: user.email
            });
        });

        res.status(200).json({ status_code: 200, message: 'User listing fetched Successfully::', data: responseData });

    } catch (err) {
        res.status(500).json({ status_code: 500, message: 'Error in fetching user listing::', error: err.message });
    }
};

