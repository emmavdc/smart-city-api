const pool = require("../utils/database");
const AnimalTypeModel = require("../model/animalType");


module.exports.getAnimalTypes = async (req, res) => {
    const client = await pool.connect();

    try {
        const animalTypes = await AnimalTypeModel.getAnimalTypes(client);
        res.json(animalTypes);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
};