const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if( !email || !password){
      return res.status(400).json({ status_code: 400, message: "Email id and password both required for login" });
    }
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ status_code: 401, message: "Invalid email id or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15h",
    });

    res.status(200).json({ status_code: 200, message: "User ogin successful::", token });
  } catch (err) {
    res.status(500).json({ status_code: 500, message: "Error in user logging::",error: err.message });
  }
};
