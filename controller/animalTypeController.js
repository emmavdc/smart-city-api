const pool = require("../utils/database");
const AnimalTypeModel = require("../model/animalType");


/**
 * @swagger
 * components:
 *  responses:
 *      AnimalTypesAreFound:
 *          description: The animal types are returned
 *      AnimalTypesAreNotFound:
 *          description : The animal types are not obtained
 *
 */

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

/**
 * @swagger
 * components:
 *  responses:
 *      UserAnimaltypeAdded:
 *          description: The supplier animal type is added
 * 
 *  requestBodies:
 *      UserAnimaltype:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          animalTypeId:
 *                              type: integer
 *                      required:
 *                          -  animalTypeId
 */


module.exports.postSupplierAnimal = async (req, res) => {
    const client = await pool.connect();
    const {animalTypeId} = req.body; 
    const userId = req.session.userId;

    if (!animalTypeId) {
        res.sendStatus(400);
        return;
      }

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

/**
 * @swagger
 * components:
 *  responses:
 *      SupplierAnimalTypesAreFound:
 *          description: The supplier animal types are returned
 */

module.exports.getSupplierAnimalTypes = async (req, res) => {
    const client = await pool.connect();
    const userId = req.session.userId;

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

/**
 * @swagger
 * components:
 *  responses:
 *      UserAnimaltypeDeleted:
 *          description: The supplier animal type is deleted
 *      UserAnimaltypeNotDeleted:
 *          description: The supplier animal type id is not found 
 */


module.exports. deleteSupplierAnimal = async (req, res) => {
    const client = await pool.connect();
    const animalTypeId = req.params.id;
    const userId = req.session.userId;

    try{
        const rowCount = await AnimalTypeModel.deleteSupplierAnimal(client, animalTypeId,userId);
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

