const express = require('express')
const router = new express.Router()
const authentication = require('../authentication')

router.post("/driver/login", async (req, res) => {
    let userId = req.body.userId
    let password = req.body.password

    if (userId == password) {
        let token = authentication.createToken(req)

        console.log(token)

        res.status(200).send({
            success: true,
            token: token
        })
    } else {
        res.status(404).send({
            success: false,
            message: 'User not found'
        })
    }
})

router.post("/driver/addOrder", authentication.checkToken, async (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Added an order'
    })
})

module.exports = router