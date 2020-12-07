const pool = require("../utils/database");
const AnimalModel = require("../model/animal");

/**
 * @swagger
 * components:
 *  responses:
 *      AnimalRegistered:
 *          description: The animal is registered
 *      AnimalAlreadyExist:
 *          description: The animal already exists
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *
 *  requestBodies:
 *      Animal:
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
 *                              type: integer
 *                          name:
 *                              type: string
 *                          picture:
 *                              type: boolean
 *                      required:
 *                          - breed
 *                          - weight
 *                          - name
 * 
 */

module.exports.getAnimals = async (req, res) => {
    const client = await pool.connect();
    const userId = req.session;
  
    try {
      const animals =  AnimalModel.getAnimals(client, userId);
      res.status(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  };

  module.exports.postAnimal = async (req, res) => {
    const client = await pool.connect();
    const animal = req.body;
  
    try {
      const jwt = await AnimalModel.addAnimal(client, animal);
      res.status(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  };

  module.exports.putAnimal = async (req, res) => {
    const client = await pool.connect();
    const animal = req.body;
    const animalId = req.body;
  
    try {
      const jwt = await AnimalModel.updateAnimal(client, animal, animalId);
      res.status(201);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  };

  module.exports.deleteAnimal = async (req, res) => {
    const client = await pool.connect();
    const animalId = req.body;
  
    try {
      const jwt = await AnimalModel.deleteAnimal(client, animalId);
      res.status(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  };