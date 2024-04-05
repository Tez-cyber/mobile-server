import dotenv from "dotenv"

dotenv.config()

//Connecting to mongo atlas
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mobilesystem.1zaroed.mongodb.net/`;

//Connecting to local db
const MONGO_URL = process.env.MONGO_TEST || "";

//Server
const SERVER_PORT = process.env.PORT || 4400

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT 
    }
}

