module.exports.selectAnimalTypes = async (client) => {
    return client.query(`
    SELECT animal_type_id, label
    FROM smartcity."animal_type"`);
};