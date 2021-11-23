const extractFieldFromSnapshot = ({ snapshot, fieldName }) => snapshot.get(fieldName);

module.exports = extractFieldFromSnapshot;
