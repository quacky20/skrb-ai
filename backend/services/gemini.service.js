const gemini = require('../config/gemini.config')
const responseCleanup = require('../utils/cleanUp')
const getPrompt = require('./calculate.prompt')

async function calculate(image, dict_of_vars) {
    const dict_of_vars_str = JSON.stringify(dict_of_vars)

    const prompt = getPrompt(dict_of_vars_str)

    const base64Data = image.split(',')[1]
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64Data,
            },
        },
        { text: prompt },
    ];
    const response = await gemini.models.generateContent({
        model: "gemma-3-27b-it",
        contents: contents,
    });

    return responseCleanup(response.text)
}

module.exports = calculate