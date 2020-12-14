const AnimalTypeDAO = require("../dao/animalTypeDAO");

module.exports.getAnimalTypes = async (client) => {
    const {rows : animalTypes} = await AnimalTypeDAO.selectAnimalTypes(client);
    return animalTypes;
};

module.exports.createSupplierAnimal = async (client, animalTypeId, userId) => {
    
    return await AnimalTypeDAO.insertSupplierAnimal(client, animalTypeId, userId);
};

module.exports.getSupplierAnimalTypes = async (client, userId) => {
    const {rows : animalTypes} = await AnimalTypeDAO.selectSupplierAnimalTypes(client, userId);
    return animalTypes;
};

module.exports. deleteSupplierAnimal = async (client, animalTypeId, userId) => {
    const rowCount = await AnimalTypeDAO.deleteSupplierAnimal(client, animalTypeId, userId);
    return rowCount;
};