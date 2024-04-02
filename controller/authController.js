import User from "../model/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
class App {
    createToken = (_id) => {
        return jwt.sign({_id}, process.env.JWT, { expiresIn: "3d" })
    }
    //------register User
    registerUser = async (req, res) => {
        const { firstname, lastname, email, password } = req.body
        try {
            const checkEmail = await User.findOne({ email })
            if (checkEmail) {
                res.json({ mssg: `User with email already exists`})
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const saved = new User({
                    firstname,
                    lastname,
                    email,
                    password: hashedPassword
                })
                const savedUser = await saved.save()

                //---------creating token
                res.status(200).json(`${savedUser.firstname}, your account has been created successfully`)
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    //-----------login user
    loginUser = async (req, res) => {
        // const { email, password } = req.body
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                res.send("Invalid email")
            } else {
                const validPassword = await bcrypt.compare(req.body.password, user.password)
                if (!validPassword) {

                    res.status(400).json("Wrong Password")
                }
            }
            // const { password, ...otherDetails } = user._doc
            // res.status(200).json({...otherDetails})
            const token = jwt.sign(
                { id: user._id }, 
                process.env.JWT
            )

            const { password, ...otherDetails } = user._doc

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json({...otherDetails})
        } catch (err) {
            res.status(500).json()
        }
    }

}

const newApp = new App
export default newApp