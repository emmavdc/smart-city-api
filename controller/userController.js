const pool = require("../utils/database");
const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * components:
 *  responses:
 *      UserRegistered:
 *          description: The user is registered and received his jwt
 *      UserAlreadyExist:
 *          description: The user already exists
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
  const user = req.body;

  // An admin is not create via this method
  user.isAdmin = false;

  if (!validate(user)) {
    res.sendStatus(400);
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN;");
    const userId = await UserModel.createUser(client, user);
    if (userId) {
      const expiresIn = "1y";

      const token = jwt.sign(
        {
          email: user.email,
          userId: userId,
        },
        process.env.SECRET,
        {
          expiresIn: expiresIn,
        }
      );

      await client.query("COMMIT");
      res.status(201).send(token);
    } else {
      await client.query("ROLLBACK");
      res.status(409).json("l'utilisateur existe déjà!");
    }
  } catch (e) {
    await client.query("ROLLBACK;");
    console.log(e);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

// secret method only use by restricted people to add an admin
module.exports.addAdminUser = async (req, res) => {
  const user = req.body;

  if (user.secret == process.env.CREATE_ADMIN_SECRET) {
    user.isAdmin = true;
    const client = await pool.connect();
    try {
      await client.query("BEGIN;");
      await UserModel.createUser(client, user);
      await client.query("COMMIT");
      res.sendStatus(201);
    } catch (e) {
      await client.query("ROLLBACK;");
      console.log(e);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  } else {
    res.sendStatus(401);
  }
};

/**
 * @swagger
 * components:
 *  responses:
 *      LoginAccepted:
 *          description: The user is connected and recieved jwt
 *      LoginRejected:
 *          description: The user is not connected because of bad email/password
 *
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          required:
 *                  - email
 *                  - password
 */

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.sendStatus(400);
    return;
  }

  const user = req.body;

  const client = await pool.connect();
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
};

/**
 * @swagger
 * components:
 *  responses:
 *      UserIsFound:
 *          description: The user is returned
 *
 */
module.exports.getUser = async (req, res) => {
  const user_id = req.params.id;

  if (isNaN(user_id)) {
    res.sendStatus(400);
    return;
  }

  const client = await pool.connect();
  try {
    const user = await UserModel.getUser(client, user_id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(401);
    }
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
 *                                  locality:
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
 *                                  locality:
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
  let userId = req.session.userId;
  const user = req.body;
  user.isAdmin = false;

  if (!validate(user)) {
    res.sendStatus(400);
    return;
  }
  

  const client = await pool.connect();
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

//patch for admin

/**
 * @swagger
 * components:
 *  responses:
 *      UserUpdatedByAdmin:
 *          description: The user is updated by admin
 *
 *  requestBodies:
 *      UpdateUserByAdmin:
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
 */

module.exports.patchUser = async (req, res) => {
  const user = req.body;
  const userIdParams = req.params.id;

  if (!validate(user)) {
    res.sendStatus(400);
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN;");
    await UserModel.updateUser(client, user, userIdParams, true);
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
 *      UsersAreFound:
 *          description: The users are returned
 *      UserAreNotFound:
 *          description : Thee users are not obtained
 *
 */

module.exports.getUsers = async (req, res) => {
  const filters = req.query;

  const client = await pool.connect();
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

/**
 * @swagger
 * components:
 *  responses:
 *      UserDeleted:
 *          description: The user is deleted
 *      UserNotDeleted:
 *          description : The user is not found
 *
 */

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (isNaN(userId)) {
    res.sendStatus(400);
    return;
  }

  const client = await pool.connect();
  try {
    const rowCount = await UserModel.deleteUser(client, userId);
    if (rowCount == 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
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
 *      UserRegisteredByAdmin:
 *          description: The user is registered
 *      UserAlreadyExist:
 *          description: The user already exists
 *      UserNotRegisteredByAdmin:
 *           description : Invalid inputs
 *
 *  requestBodies:
 *      AddUserByAdmin:
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

module.exports.addUserByAdmin = async (req, res) => {
  const user = req.body;

  if (!validate(user)) {
    res.sendStatus(400);
    return;
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN;");
    const userId = await UserModel.createUser(client, user);
    if (userId) {
      await client.query("COMMIT");
      res.sendStatus(201);
    } else {
      await client.query("ROLLBACK");
      res.status(409).json({ error: "The user already exists!" });
    }
  } catch (e) {
    await client.query("ROLLBACK;");
    console.log(e);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

function validate(user) {
  return (
    user.email &&
    user.password &&
    user.firstname &&
    user.lastname &&
    user.phone &&
    user.locality &&
    user.postalCode &&
    user.streetNumber &&
    user.streetName &&
    user.country &&
    user.supplier &&
    user.supplier.isHost != undefined &&
    user.supplier.isAnimalWalker != undefined &&
    user.customer &&
    user.customer.searchHost != undefined &&
    user.customer.searchWalker != undefined
  );
}
