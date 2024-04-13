import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accountBalance: {
        type: Number,
        default: ""
    }
}, {
    timestamps: true
})

export default mongoose.model("User", UserSchema)