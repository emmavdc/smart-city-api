const AnimalTypeDAO = require("../dao/animalTypeDAO");
module.exports.getAnimalTypes = async (client) => {
    const {rows : animalTypes} = await AnimalTypeDAO.selectAnimalTypes(client);
    return animalTypes;
};