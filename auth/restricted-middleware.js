const restrict = (req, res, next) => {
    (req.session && req.session.user)?
        next():
        res.status(400).json({ message: "Log in, you dope!" })    
}

module.exports = restrict