const calculate = require('../services/gemini.service')

const getResponse = async (req, res) => {
    const image = req.body.image
    const dict_of_vars = req.body.variables

    response = await calculate(image, dict_of_vars)
    const answers = JSON.parse(response)

    res.status(200).json(answers)
}

module.exports = { getResponse }