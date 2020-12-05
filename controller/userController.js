const pool = require("../utils/database");
const UserModel = require("../model/user");

/**
 * @swagger
 * components:
 *  responses:
 *      UserRegistered:
 *          description: The user is registered
 *      UserAlreadyExist:
 *          description: The user already exists
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *      UserNotRegistered:
 *           description : Invalid inputs
 *
 *  requestBodies:
 *      AddUser:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          firstname:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          phone:
 *                              type: string                        
 *                          locality:
 *                              type: string
 *                          postalCode:
 *                              type: integer
 *                          streetNumber:
 *                              type: string
 *                          streetName:
 *                              type: string
 *                          country:
 *                              type: string
 *                          customer:
 *                              type: object
 *                              properties:
 *                                  searchWalker:
 *                                      type: boolean
 *                                  searchHost:
 *                                      type: boolean
 *                              required:
 *                                  - searchWalker
 *                                  - searchHost
 *                          supplier:
 *                              type: object
 *                              properties:
 *                                  isHost:
 *                                      type: boolean
 *                                  isAnimalWalker:
 *                                      type: boolean
 *                              required:
 *                                  - isHost
 *                                  - isAnimalWalker
 *                      required:
 *                          - email
 *                          - password
 *                          - firstname
 *                          - lastname
 *                          - phone
 *                          - locality
 *                          - postalCode
 *                          - streetNumber
 *                          - streetName
 *                          - country
 * 
 */

module.exports.postUser = async (req, res) => {
  const client = await pool.connect();
  const user = req.body;

  //TODO #5 validate type

  // a user is never an admin
  user.isAdmin = false;

  /*if(typeof user.postalCode !== "integer"){
        res.sendStatus(400);
        return;
    }*/

  if (user.customer != null) {
    if (
      typeof user.customer.searchWalker !== "boolean" ||
      typeof user.customer.searchHost !== "boolean"
    ) {
      res.sendStatus(400);
      return;
    }
  }

  if (user.supplier != null) {
    if (
      typeof user.supplier.isHost !== "boolean" ||
      typeof user.supplier.isAnimalWalker !== "boolean"
    ) {
      res.sendStatus(400);
      return;
    }
  }

  try {
    await client.query("BEGIN;");
    const jwt = await UserModel.createUser(client, user);
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

module.exports.addAdminUser = async (req, res) => {

    const user = req.body;
    if (user.secret == process.env.CREATE_ADMIN_SECRET) {
 
    const client = await pool.connect();
    user.isAdmin = true;

    try {
      await client.query("BEGIN;");
      const jwt = await UserModel.createUser(client, user);
      await client.query("COMMIT");
      res.status(201).send(jwt);
    } catch (e) {
      await client.query("ROLLBACK;");
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
  else {
    res.sendStatus(401);
  }
};


/**
 * @swagger
 * components:
 *  responses:
 *      LoginAccepted:
 *          description: The user is connected
 *      LoginRejected:
 *          description: The user is not connected
 *
 *  requestBodies:
 *      Login:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      required:
 *                          - email
 *                          - password
 */



module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res.sendStatus(500);
  } else {
    const client = await pool.connect();
    const user = req.body;

    try {
      const jwt = await UserModel.loginUser(client, user);
      if (jwt) {
        res.status(200).send(jwt);
      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
};

/**
 * @swagger
 * components:
 *  responses:
 *      UserUpdated:
 *          description: The user is updated
 *      UserDoesNotHaveAcces:
 *          description : The user does not have access
 *
 *  requestBodies:
 *      UpdateUser:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          firstname:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          phone:
 *                              type: string                        
 *                          locality:
 *                              type: string
 *                          postalCode:
 *                              type: integer
 *                          streetNumber:
 *                              type: string
 *                          streetName:
 *                              type: string
 *                          country:
 *                              type: string
 *                          picture:
 *                              type: string
 *                          customer:
 *                              type: object
 *                              properties:
 *                                  searchWalker:
 *                                      type: boolean
 *                                  searchHost:
 *                                      type: boolean
 *                                  commune: 
 *                                      type: string
 *                              required:
 *                                  - searchWalker
 *                                  - searchHost
 *                          supplier:
 *                              type: object
 *                              properties:
 *                                  isHost:
 *                                      type: boolean
 *                                  isAnimalWalker:
 *                                      type: boolean
 *                                  slogan:
 *                                      type: string
 *                                  commune:
 *                                      type: string
 *                                  weightMax:
 *                                      type: integer
 *                              required:
 *                                  - isHost
 *                                  - isAnimalWalker
 *                      required:
 *                          - email
 *                          - password
 *                          - firstname
 *                          - lastname
 *                          - phone
 *                          - locality
 *                          - postalCode
 *                          - streetNumber
 *                          - streetName
 *                          - country
 */


module.exports.putUser = async (req, res) => {
  const client = await pool.connect();
  const userId = req.session.userId;
  const userIdParams = req.params.id;
  const user = req.body;

  if (Number(userId) !== Number(userIdParams)) {
    res.sendStatus(403);
    return;
  }

  try {
    await client.query("BEGIN;");
    await UserModel.updateUser(client, user, userId);
    await client.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await client.query("ROLLBACK;");
    console.log(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

/**
 * @swagger
 * components:
 *  responses:
 *      UsersAreGet:
 *          description: The users are obtained

 *
 *  requestBodies:
 *      GetUsers:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 
 */

module.exports.getUsers = async (req, res) => {
  const client = await pool.connect();

  const filters = req.query;
  try {
    const users = await UserModel.getUsers(client, filters);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
