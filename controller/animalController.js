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
    const client = await pool.connect();
    const userId = req.session.userId;

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
    const client = await pool.connect();
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

module.exports.putAnimal = async(req, res) =>{
    const client = await pool.connect();
    const userId = req.session.userId;
    const animal = req.body;
    const animalId = req.params.id;

    try {
        await AnimalModel.updateAnimal(client, animal, animalId, userId);
        res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        
    }finally{
        client.release(); 
    }
};



module.exports.deleteAnimal = async(req, res) =>{
    const client = await pool.connect();
    const animalId = req.params.id;
    const userId = req.session.userId;

    try{
        const rowCount = await AnimalModel.deleteAnimal(client, animalId,userId);
        if(rowCount != 0){
            res.sendStatus(200);
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