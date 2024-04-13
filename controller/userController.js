import User from "../model/User.js"

class App {
    //--------------------Update User information
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
}

const newApp = new App
export default newApp