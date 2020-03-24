const express = require("express")
const server = express()
const session = require("express-session")

const router = require("../router/router")

const sessionConfig = {
    name: "totally innocent cookie",
    secret: "unhackable secret, maybe, not really",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: true  
    },
    resave: false,
    saveUninitialized: false
}

server.use(express.json())
server.use(session(sessionConfig))
server.use("/", router)

module.exports = server