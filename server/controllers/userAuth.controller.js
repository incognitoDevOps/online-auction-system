import { connectDB } from "../connection.js";
import User from "../models/user.js";
import Login from "../models/Login.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateToken } from "../utils/jwt.js";
import { getClientIp, getLocationFromIp } from "../utils/geoDetails.js";

dotenv.config();

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: "All fields are required" });

    try {
        await connectDB();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        // Secure cookie for cross-origin auth
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: true,               // Always true for cross-origin
            sameSite: "None",           // Required for cross-site cookies
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const ip = getClientIp(req);
        const userAgent = req.headers["user-agent"];
        const location = await getLocationFromIp(ip);

        const login = new Login({
            userId: user._id,
            ipAddress: ip,
            userAgent,
            location,
            loginAt: new Date(),
        });

        await login.save();

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Server error during login" });
    }
};

export const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const ip = getClientIp(req);
        const userAgent = req.headers["user-agent"];
        const location = await getLocationFromIp(ip);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar: "https://avatar.iran.liara.run/public/7",
            ipAddress: ip,
            userAgent,
            location,
            signupAt: new Date(),
        });

        await newUser.save();

        const login = new Login({
            userId: newUser._id,
            ipAddress: ip,
            userAgent,
            location,
            loginAt: new Date(),
        });

        await login.save();

        const token = generateToken(newUser._id);

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Server error during signup" });
    }
};

export const handleUserLogout = async (req, res) => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });
    return res.status(200).json({ message: "Logged out successfully" });
};
