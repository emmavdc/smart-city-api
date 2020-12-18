const pool = require("../utils/database");
const AnimalModel = require("../model/animal");

/**
 * @swagger
 * components:
 *  responses:
 *      AnimalsReturned:
 *          description: The animals are returned
 * 
 */

module.exports.getAnimals = async(req, res) =>{
    const userId = req.session.userId;

    const client = await pool.connect();
    try{
        const animals = await AnimalModel.getAnimals(client,userId);
        res.json(animals);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    finally{
        client.release();  
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      AnimalAdded:
 *          description: User Animal added
 *
 *  requestBodies:
 *      AddAnimal:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          breed:
 *                              type: string
 *                          review:
 *                              type: string
 *                          weight:
 *                              type: string
 *                          name:
 *                              type: string
 *                          animalTypeId:
 *                              type: integer
 *                      required:
 *                          - breed
 *                          - weight
 *                          - name
 *                          - animalTypeId
 * 
 */

module.exports.postAnimal = async(req, res) =>{
    const userId = req.session.userId;
    const animal = req.body;

    if (
        !animal.breed ||
        !animal.weight ||
        !animal.name ||
        !animal.animalTypeId
      ) {
        res.sendStatus(400);
        return;
      }

    const client = await pool.connect();
    try {
        await AnimalModel.createAnimal(client, animal, userId);
        res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        
    }finally{
        client.release(); 
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      AnimalUpdated:
 *          description: User Animal updated
 *      AnimalNotFound:
 *          description: Animal is not found
 *
 *  requestBodies:
 *      UpdateAnimal:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          breed:
 *                              type: string
 *                          review:
 *                              type: string
 *                          weight:
 *                              type: string
 *                          name:
 *                              type: string
 *                          animalTypeId:
 *                              type: integer
 * 
 */

module.exports.putAnimal = async(req, res) =>{
    const userId = req.session.userId;
    const animal = req.body;
    const animalId = req.params.id;

    if (isNaN(animalId)) {
        res.sendStatus(400);
        return;
      }

    const client = await pool.connect();
    try {
        const rowCount = await AnimalModel.updateAnimal(client, animal, animalId, userId);
        if(rowCount == 1){
            res.sendStatus(201);
        }
        else{
            res.sendStatus(404);
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        
    }finally{
        client.release(); 
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      AnimalDeleted:
 *          description: The animal is deleted
 *      AnimalNotDeleted:
 *          description : The animal is not found
 *
 */

module.exports.deleteAnimal = async(req, res) =>{
    const animalId = req.params.id;
    const userId = req.session.userId;

    if (isNaN(animalId)) {
        res.sendStatus(400);
        return;
    }

    const client = await pool.connect();
    try{
        const rowCount = await AnimalModel.deleteAnimal(client, animalId,userId);
        if(rowCount == 1){
            res.sendStatus(204);
        }
        else{
            res.status(404).json("L'animal n'existe pas");
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