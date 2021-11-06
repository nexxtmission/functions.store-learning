const getLanguagesList = (languages) => {
    if (!languages) return [];
    return Array.from(new Set(String(languages).split(',')));
};

module.exports = getLanguagesList;
