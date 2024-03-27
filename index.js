import express from "express";
import dotenv from "dotenv"

dotenv.config()
const app = express()

//Middlewares
app.use(express.json())


const PORT = 4400
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})