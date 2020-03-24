const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")

const db = require("../users-model")
const restrict = require("../auth/restricted-middleware")

router.get("/api/users", restrict, (req, res) => {
    db.getUsers()
        .then(users => res.status(200).json(users))
        .catch(() => res.status(500))
})
router.post("/api/auth/register", (req, res) => {
    const { username, password } = req.body
    const newPassword = bcrypt.hashSync(password, 12)
    db.insert({ username, password: newPassword })
        .then(() => res.status(201).json({ username, password: newPassword }))
        .catch(() => res.status(500))
})
router.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body
    db.findUser({ username })
    .first()
    .then(user => { 
        if (user && bcrypt.compareSync(password, user.password)){
            req.session.user = {
                id: user.id,
                username: user.username
            }
            console.log(req.session.user)
            res.status(200).json({ message: "Success!" })
        } else { res.status(401).json({ message: "Failure!" }) }
        })
        .catch((error) => res.status(500).json({ message: "What?", error: error.message }))
})
router.get("/api/auth/logout", (req, res) => {
    (req.session.user) ?
        req.session.destroy(err => 
            (err) ? res.status(500).json({ message: "Error logging out." })
            : res.status(200).json({ message: "See you!" }))
        : res.status(400).json({ message: "Log in, you dope!" })
})
module.exports = router