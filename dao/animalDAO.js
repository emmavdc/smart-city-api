module.exports.selectAnimals = async (client, userId) => {
    
    const customerId = await client.query(`
        SELECT customer_id
        FROM smartcity."customer"
        WHERE user_id = $1`, [userId]);

        const {rows: animals} = await client.query(`
        SELECT  a.animal_id, a.breed, a.review, a.weight, a.name, t.label
        FROM smartcity."animal" a, smartcity."animal_type" t
        WHERE a.customer_id = $1 and a.animal_type_id = t.animal_type_id`, [customerId]);

        return animals;
}



module.exports.insertAnimal = async (client, animal) => {

    return await client.query(`
        INSERT INTO smartcity."animal" (breed, review, weight, name, customer_id, animal_type_id) 
        VALUES ($1, $2, $3, $4, $5, $6)`, [animal.breed, animal.review, animal.weight, 
                                            animal.name, animal.customerId, animal.animalTypeId]
    );
}

module.exports.updateAnimal = async (client, animal, animalId) => {

    return await client.query(`
     UPDATE smartcity."animal" SET breed = $1, review = $2, weight = $3,
                             name = $4, customer_id = $5, animal_type_id = $6 
                             WHERE animal_id = $7;`, 
                             [animal.breed, animal.review, animal.weight, animal.name, 
                                 animal.customerId, animal.animalTypeId, animalId]);
 }