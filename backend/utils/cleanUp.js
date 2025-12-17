function responseCleanup(response) {
    let cleaned = response.replace(/```json\s*/g, '').replace(/```\s*/g, '');

    cleaned = cleaned.replace(/`/g, '')
    cleaned = cleaned.trim()

    if (!cleaned.startsWith('[')) {
        const match = cleaned.match(/\[[\s\S]*\]/);
        if (match) {
            cleaned = match[0];
        }
    }

    return cleaned
}

module.exports = responseCleanup