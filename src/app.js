const express = require('express')
const app = express()
const PORT = 4000

app.use(express.json())
app.use('/v1', require('../routes/v1'))

app.use((req, res, next) => {
    const error = new Error("We think you are lost");
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        status: err.status,
        message: err.message,
    })
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})