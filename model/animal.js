const AnimalDAO = require("../dao/animalDAO");
const router = require("../route/animal");

module.exports.getAnimals = async(client, userId) =>{
    const {rows : animals} = await AnimalDAO.selectAnimals(client,userId);
    return animals;
};

module.exports.createAnimal = async(client,animal,userId) =>{
    return await AnimalDAO.insertAnimal(client,animal, userId);
};

module.exports.updateAnimal = async(client, animal, animalId, userId) =>{
    return await AnimalDAO.updateAnimal(client, animal, animalId, userId);
};


module.exports.deleteAnimal = async(client,animalId,userId) =>{
     const{rowCount} = await AnimalDAO.deleteAnimal(client, animalId, userId);
     return rowCount;
};