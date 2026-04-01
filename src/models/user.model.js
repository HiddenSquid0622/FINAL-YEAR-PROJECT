import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,

    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Please enter correct email address"],
    },
    password : {
        type: String,
        required: true,
        minlength: 6,
    }
} , {timestamps: true});

export const User = mongoose.model("User", userSchema); 