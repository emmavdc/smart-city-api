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
module.exports.postSupplierAnimal = async (req, res) => {
    const client = await pool.connect();
    const {animalTypeId} = req.body; 
    const userId = req.session;

    try {
        await AnimalTypeModel.createSupplierAnimal(client, animalTypeId, userId);
        res.sendStatus(201);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
};

module.exports.getSupplierAnimalTypes = async (req, res) => {
    const client = await pool.connect();
    const userId = req.session;

    try {
        const animalTypes = await AnimalTypeModel.getSupplierAnimalTypes(client,userId);
        res.json(animalTypes);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
};


module.exports. deleteSupplierAnimal = async (req, res) => {
    const client = await pool.connect();
    const animalTypeId = req.params.id;
    const userId = req.session;

    try{
        const rowCount = await AnimalTypeModel.deleteSupplierAnimal(client, animalTypeId,userId);
        if(rowCount != 0){
            res.sendStatus(204);
        }
        else{
            res.sendStatus(403);
        }
       
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    finally{
        client.release();  
    }
};

