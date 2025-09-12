import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.staus(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);

    const userObject = {
      name,
      email,
      hashedPassword,
      role,
    };

    const user = await user.create(userObject);
    res.staus(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    jwtUser = { id: user._id, name: user.name, role: user.role };

    res.json({
      token,
      jwtUser
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
