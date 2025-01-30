import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate emails
    },
    password: {
        type: String,
        required: true
    },
    info: {
        type: Object, // Can store additional user details (like bio, address, etc.)
        default: {}
    },
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
