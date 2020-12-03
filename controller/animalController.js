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

module.exports.getAnimal = async (req, res) => {
    const client = await pool.connect();
    const user = req.body;
  
    if (user.customer != null || (!user.customer.searchWalker && !user.customer.searchHost)) {
        res.sendStatus(400);
        return;
    }
  
    try {
      await client.query("BEGIN;");
      const jwt = await AnimalModel.getAnimal(client, user_id);
      await client.query("COMMIT");
      res.status(201).send(jwt);
    } catch (e) {
      await client.query("ROLLBACK;");
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  };

  module.exports.addAnimal = async (req, res) => {
    const client = await pool.connect();
    const user = req.body;
  
    try {
      await client.query("BEGIN;");
      const jwt = await AnimalModel.addAnimal(client, animal);
      await client.query("COMMIT");
      res.status(201).send(jwt);
    } catch (e) {
      await client.query("ROLLBACK;");
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  };

  module.exports.updateAnimal = async (req, res) => {
    const client = await pool.connect();
    const user = req.body;
  
    try {
      await client.query("BEGIN;");
      const jwt = await AnimalModel.updateAnimal(client, animal, animal_id);
      await client.query("COMMIT");
      res.status(201).send(jwt);
    } catch (e) {
      await client.query("ROLLBACK;");
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  };