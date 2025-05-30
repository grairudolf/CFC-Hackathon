import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/env.js";
import mongoose from "mongoose";

export const logIn = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.find({ email });

        if (!user || user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: True,
            message: "User created successfully",
            data: {
                token,
                user
            }
        })

    } catch (error) {
        session.abortTransaction();
        session.endSession();
        next(error);
    }
}