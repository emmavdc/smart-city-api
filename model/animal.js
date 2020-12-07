const AnimalDAO = require("../dao/animalDAO");

module.exports.getAnimals = async (client, userId) => {
  
    const {rows : animals} = await AnimalDAO.selectAnimals(client, userId);
    return animals;
  };

  module.exports.createAnimal = async (client, user) => {
  
    return await AnimalDAO.insertAnimal(client, animal);
    
  };

  module.exports.updateAnimal = async (client, animal, animalId) => {
  
    return await AnimalDAO.updateAnimal(client, animal, animalId);
  };

  module.exports.deleteAnimal = async (client, animalId) => {
  
    return await AnimalDAO.deleteAnimal(client, animalId);
  };