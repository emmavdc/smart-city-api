module.exports.selectAnimals = async (client, userId) => {
    
    //TODO : select the customerID



    return await client.query(`
        SELECT  animal_id, breed, review, weight, name, animal_type_id
        FROM smartcity."animal"
        WHERE customer_id = $1`, [userId]);


} // + extraire le type d'animal via une jointure



module.exports.insertAnimal = async (client, animal) => {
    const {rows: newAnimal} = await client.query(`
        INSERT INTO smartcity."animal" (breed, review, weight, name, customer_id, animal_type_id) 
        VALUES ($1, $2, $3, $4, $5, $6)`, [animal.breed, animal.review, animal.weight, 
                                                                 animal.name, animal.customerId, animal.animalTypeId]
    );
    return newAnimal[0].animal_id;
}

module.exports.updateAnimal = async (client, animal, animalId) =>{



    return await client.query(`
     UPDATE smartcity."animal" SET breed = $1, review = $2, weight = $3,
                             name = $4, customer_id = $5, animal_type_id = $6 
                             WHERE user_id = $7;`, 
                             [animal.breed, animal.review, animal.weight, animal.name, 
                                 animal.customer_id, animal.animal_type_id, animalId]);
 }