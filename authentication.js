let jwt = require('jsonwebtoken')
const config = require('./config')

let checkToken = (req, res, next) => {
    let token = req.headers.authtoken
    if (token) {
        jwt.verify(token, config.secretKey, (err, decodedToken) => {
            if (err) {
                return res.json({
                    "success" : false,
                    "message" : "authentication failed"
                })
            } else {
                if (decodedToken.userId == req.headers.userid) {
                    req.token = decodedToken
                    next()
                } else {
                    return res.json({
                        "success" : false,
                        "message" : "authentication failed"
                    })
                }
            }
        })
    } else {
        return res.json({
            "success" : false,
            "message" : "authentication token is missing from the request headers"
        })
    }
}

let createToken = (req) => {
    let userId = req.body.userId
    let password = req.body.password

    let token = jwt.sign({userId: userId}, config.secretKey)

    return token
}

module.exports = {
    checkToken: checkToken,
    createToken: createToken
}