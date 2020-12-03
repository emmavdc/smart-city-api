const UserDAO = require("../dao/animalDAO");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// Il faut return un jwt.sign avec chaque modèle ? 
// Et ici normalement, pas besoin de bcrypt si je ne me trompe. Il n'y a pas d'infos secrètes sur les animaux

module.exports.getAnimal = async (client, user) => {
  
    const animals = await AnimalDAO.selectAnimal(client, user_id); // Comment récupérer et stocker la liste ?
    
    // Du coup les jwt.sign jsp si je dois aussi les faire ici :x
  };

  module.exports.createAnimal = async (client, user) => {
  
    const animal_id = await AnimalDAO.insertAnimal(client, animal);
    
  };

  module.exports.updateUser = async (client, animal, animal_id) => {
  
    //todo : business check
  
    return await AnimalDAO.updateAnimal(client, animal, animal_id);
  };