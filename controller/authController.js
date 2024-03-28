import User from "../model/User.js"
import bcrypt from "bcryptjs"
class App {

    //------register User
    registerUser = async (req, res) => {
        const { firstname, lastname, email, password } = req.body
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const saved = new User({
                firstname,
                lastname,
                email,
                password: hashedPassword
            })
            const saveUser = await saved.save()
            res.status(200).json(`${saveUser.firstname}, your account has been created successfully`)
        }catch(err) {
           res.status(500).json(err)
        }
    }

    //-----------login user
    loginUser = async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            if(!user) {
                res.send("Invalid email")
            }else {
                const validPassword = await bcrypt.compare(password, user.password)
                if(validPassword) {
                    res.status(200).json(`Welcome, ${user.firstname}`)
                }else {
                    res.send("Incorrect password")
                }
            }
        }catch(err) {
            res.status(500).json()
        }
    }

}

const newApp = new App
export default newApp