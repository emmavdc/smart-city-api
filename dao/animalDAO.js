const UserDAO = require("./userDAO");

module.exports.selectAnimals = async(client, userId) =>{
    
    const customer = await UserDAO.selectCustomer(client, userId); 

    return await client.query(`
    SELECT a.animal_id, a.breed, a.review, a.weight, a.name, a.customer_id, atype.label
    FROM smartcity."animal" a, smartcity."animal_type" atype
    WHERE customer_id = $1 
    AND a.animal_type_id = atype.animal_type_id`, [customer[0].customer_id]); 
    
};

module.exports.insertAnimal = async(client,animal, userId) =>{
    
    const customer = await UserDAO.selectCustomer(client, userId);

    return await client.query(`
    INSERT INTO smartcity."animal"(breed,review, weight, name, customer_id, animal_type_id)
    VALUES($1, $2,$3,$4,$5,$6)`, 
    [animal.breed,
         animal.review,
         animal.weight, animal.name,
         customer[0].customer_id,
         animal.animalTypeId]);
};

module.exports.updateAnimal = async(client, animal, animalId, userId) =>{
    const customer = await UserDAO.selectCustomer(client, userId);

    return await client.query(`
    UPDATE smartcity."animal" SET breed = $1,
    review = $2, 
    weight = $3, 
    name = $4, 
    animal_type_id =$5
    WHERE animal_id = $6
    AND customer_id = $7`, 
    [
        animal.breed,
        animal.review,
        animal.weight,
        animal.name,
        animal.animalTypeId,
        animalId,
        customer[0].customer_id
    ]);
};

module.exports.deleteAnimal = async(client, animalId, userId) =>{
    const customer = await UserDAO.selectCustomer(client, userId);
    
    return await client.query(`
    DELETE FROM smartcity."animal"
     WHERE animal_id = $1 AND customer_id = $2`,[animalId,customer[0].customer_id]);
};