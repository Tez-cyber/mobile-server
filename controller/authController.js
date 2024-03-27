

class App {

    //------register User
    registerUser = async (req, res) => {
        try {
            rex.status(200).json("User registered")
        }catch(err) {
            console.log(err)
        }
    }

}

const newApp = new App
export default newApp