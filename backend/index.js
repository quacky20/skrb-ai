require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { corsOptions } = require('./config/cors')
const calculateRoute = require('./routes/calculate.route')

const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).send('Ok')
})

app.use('/', calculateRoute)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})

module.exports = app