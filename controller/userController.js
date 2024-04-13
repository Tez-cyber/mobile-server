import User from "../model/User.js"

class App {
    //--------------------Update Account information
    updateUser = async (req, res) => {
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )
            res.status(200).json(updatedUser)
        }catch(err) {
            res.status(500).json(err)
        }
    }
    //----------------------Delete acct
    deleteUser = async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)

            res.status(200).json("User account has been deleted")
        }catch(err) {
            res.status(500).json(err)
        }
    }
}

const newApp = new App
export default newApp