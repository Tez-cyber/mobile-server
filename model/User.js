import mongoosse from "mongoose"

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
    pasword: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("User", UserSchema)