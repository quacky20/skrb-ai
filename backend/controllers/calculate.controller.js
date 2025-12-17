const calculate = require('../services/gemini.service')

const getResponse = async (req, res) => {
    const image = req.body.image
    const dict_of_vars = req.body.variables

    if (!image || image.length < 100) { 
        return res.status(400).json({
            error: 'No valid image provided'
        })
    }
    response = await calculate(image, dict_of_vars)
    const answers = JSON.parse(response)

    if (response === '[]'){
        return res.status(400).json({
            error: 'No valid image provided'
        })
    }

    return res.status(200).json(answers)
}

module.exports = { getResponse }