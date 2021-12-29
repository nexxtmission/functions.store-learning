const parseJson = (jsonString) => {
    try {
        if (jsonString) {
            return JSON.parse(jsonString);
        }
    } catch (error) {
        // no catch
    }
    return null;
};

module.exports = parseJson;
