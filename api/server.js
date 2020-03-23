const express = require("express")
const server = express()
const session = require("express-session")

const router = require("../router/router")

const sessionConfig = {
    name: "totally innocent cookie",
    secret: "unhackable secret, maybe, not really",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true  
    },
    resave: false,
    saveUninitialized: true
}

server.use(express.json())
server.use("/", router)
server.use(session(sessionConfig))

module.exports = server