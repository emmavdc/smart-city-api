module.exports.selectAnimalTypes = async (client) => {
    return client.query(`
    SELECT animal_type_id, label
    FROM smartcity."animal_type"`);
};

module.exports. insertSupplierAnimal = async (client, animalTypeId, userId) => {
    const {rows : supplier} = await client.query(`
    SELECT s.supplier_id
    FROM smartcity."supplier" s, smartcity."user" u
    WHERE u.user_id = s.user_id
    AND u.user_id = $1`, [userId]);

    await client.query(`
    INSERT INTO smartcity."supplier_animal_type" (supplier_id, animal_type_id)
    VALUES($1,$2)`, [supplier[0].supplier_id, animalTypeId]);
};

module.exports.selectSupplierAnimalTypes = async (client, userId) => {

    const {rows : supplier} = await client.query(`
    SELECT s.supplier_id
    FROM smartcity."supplier" s, smartcity."user" u
    WHERE u.user_id = s.user_id
    AND u.user_id = $1`, [userId]);

    return  await client.query(`
    SELECT sat.animal_type_id, at.label
    FROM smartcity."animal_type" at, smartcity."supplier_animal_type" sat
    WHERE sat.animal_type_id = at.animal_type_id
    AND sat.supplier_id = $1`, [supplier[0].supplier_id]);

};

module.exports. deleteSupplierAnimal = async (client, animalTypeId, userId) => {
    const {rows : supplier} = await client.query(`
    SELECT s.supplier_id
    FROM smartcity."supplier" s, smartcity."user" u
    WHERE u.user_id = s.user_id
    AND u.user_id = $1`, [userId]);

    const {rowCount} = await client.query(`
    DELETE FROM smartcity."supplier_animal_type"
    WHERE animal_type_id = $1 AND supplier_id = $2`, [animalTypeId,supplier[0].supplier_id]);

   return rowCount;

};


