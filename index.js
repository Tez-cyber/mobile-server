import express from "express";
import serverless from "serverless-http"
import { config } from "./config/config.js";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import paymentRoute from './routes/payment.routes.js'
import swaggerjsdoc from "swagger-jsdoc"
import swaggerui from "swagger-ui-express"


// CDN CSS
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
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

        //Implementing SwaggerUI 
        const options = {
            definition: { 
                openapi: "3.0.0",
                info: {
                    title: "Mobile App Server",
                    version: "1.0.0",
                    description: "Swagger documention setup",
                    servers: [
                        {
                            url: `http://localhost:${PORT}`
                        }
                    ]
                },
                schemes: ["http", "https"]
            },
            apis: ["./routes/*.js"]
        }

        const swaggerSpec = swaggerjsdoc(options)
        app.use(
            "/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec)
        )
        //routes
        app.use("/api/auth", authRoute)
        app.use("/api", userRoute)
        app.use("/api/pay", paymentRoute)

        
        
        // Starting app
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`)
        })

    } catch (err) {
        console.log("Database is not connected..")
    }
}

startServer()
//To connect vercel (For delpoyment)
const options = {
    definition: {
        openai: "3.0.0",
        info: {
            title: "Mobile App Server",
            version: "1.0.0",
            description: "Swagger documention setup",
            servers: [
                {
                    url: `http://localhost:${PORT}`
                }
            ]
        },
        schemes: ["http", "https"]
    },
    apis: ["./routes/*.js"]
}

const swaggerSpec = swaggerjsdoc(options)
app.use(
    "/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec, { customCssUrl: CSS_URL })
)
//routes
app.use("/api/auth", authRoute)
app.use("/api", userRoute)
app.use("/api/pay", paymentRoute)

//Get route
app.get("/", (req, res) => {
    res.send("Server is now Launched")
})

//Export app
export default app