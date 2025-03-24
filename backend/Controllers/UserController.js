const User = require('../Models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Sign-In API`
const Signup = async (req, res) => {
    try {
        const { username, email, password, } = req.body;
        if (username.length < 4) {
            return res.status(400).json({ message: "Username should have at least 4 characters" });
        }
        const existinguser = await User.findOne({ username });
        if (existinguser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const existingemail = await User.findOne({ email });
        if (existingemail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Save New User
        const hashpassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({ username, email, password: hashpassword });
        await newUser.save();
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        return res.status(201).json({ message: "Sign-In successfully", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
//Log-in
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await User.findOne({ email });
        console.log(existinguser)
        if (!existinguser) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, existinguser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            {
                userId: existinguser._id,
                username: existinguser.username,
                email: existinguser.email

            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//edit profile
const edit = async(req,res)=>{
const { username, email, } = req.body;
    const userId = req.user._id;  // Extracted from token
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Change Password
const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user._id;  

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "New and confirm password do not match" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Old password match
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // New password 
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = { Signup, Login, edit, changePassword };