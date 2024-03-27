import express from "express";
import { config } from "./config/config.js";
import mongoose from "mongoose";

const PORT = config.server.port
const app = express()

//Middlewares
app.use(express.json())

//Linking db
const startServer = async () => {
    try {
        await mongoose.connect(config.mongo.url, {
            w: "majority",
            retryWrites: true,
            authMechanism: "DEFAULT"
        })
        console.log("Database connected successfully....")

        // Starting app
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`)
        })
    } catch (err) {
        console.log("Database is not connected..")
    }
}

startServer()