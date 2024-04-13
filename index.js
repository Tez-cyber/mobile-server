import express from "express";
import serverless from "serverless-http"
import { config } from "./config/config.js";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import swaggerjsdoc from "swagger-jsdoc"
import swaggerui from "swagger-ui-express"



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


        //routes
        app.use("/api/auth", authRoute)
        app.get("/" , (req, res) => {
            res.send("Server is now Launched") 
        })
        const options = {
            definition: {
                openai: "3.0.0",
                info: {
                    title: "Mobile App Server",
                    version: "1.0.0"
                },
                servers: [
                    {
                        url: `http://localhost:${PORT}`
                    }
                ]
            }, 
            apis: ["./routes/*.js"]
        }

        const swaggerSpec = swaggerjsdoc(options)
        app.use(
            "/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec)
        )
        // Starting app
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`)
        })

    } catch (err) {
        console.log("Database is not connected..")
    }
}

startServer()
