const express = require('express')
const router = express.Router()

const { getResponse } = require('../controllers/calculate.controller')

router.post('/calculate', getResponse)

module.exports = router