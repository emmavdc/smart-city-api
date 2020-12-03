module.exports.selectAnimal = async (client, user_id) => {
    return await client.query(`
        SELECT  animal_id, breed, review, weight, name 
        FROM smartcity."animal"
        WHERE customer_id = $1`, [user_id]); // email = id, ici ?
} // + extraire le type d'animal via une jointure

module.exports.insertAnimal = async (client, animal) => {
    const {rows: newAnimal} = await client.query(`
        INSERT INTO smartcity."animal" (breed, review, weight, name, customer_id, animal_type_id) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING animal_id`, [animal.breed, animal.review, animal.weight, 
                                                                 animal.name, animal.customer_id, animal.animal_type_id]
    );
    return newAnimal[0].animal_id;
}

module.exports.updateAnimal = async (client, animal, animal_id) =>{

    await client.query(`
     UPDATE smartcity."animal" SET breed = $1, review = $2, weight = $3,
                             name = $4, customer_id = $5, animal_type_id = $6 
                             WHERE user_id = $7;`, 
                             [animal.breed, animal.review, animal.weight, animal.name, 
                                 animal.customer_id, animal.animal_type_id, animalID]);
 
     return;
 }