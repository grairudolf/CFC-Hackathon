import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minLength: 2
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6
    }, 
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Email is not valid"],
    }, 
    isVendor: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true,
})

const User = mongoose.model("User", userSchema);
export default User;