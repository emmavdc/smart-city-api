const UserController = require("../controller/userController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")
const authorizationMiddleware = require("../middleware/authorization")


/**
 * @swagger
 * /users:
 *  post:
 *      tags:
 *          - user
 *      description: Create new user and return JWT for user identification
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddUser'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserRegistered'
 *          400:
 *               $ref: '#/components/responses/UserNotRegistered'
 *          500:
 *              description: Server error
 * 
 * 
 * 
 * 
 * 
 
 *  
 *
 */

router.post('/',  UserController.postUser);


/**
 * @swagger
 * /users/actions/login:
 *  post:
 *      tags:
 *          - user
 *      description: User login and return JWT for user identification
 *      requestBody:
 *          description: Email and password for user connection
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/LoginAccepted'
 *          401:
 *              $ref: '#/components/responses/LoginRejected'
 *          500:
 *              description: Server error
 *
 */

router.post('/actions/login', UserController.loginUser);

router.post('/actions/addadmin', UserController.addAdminUser);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *      tags:
 *          - user
 *      security:
 *          - bearerAuth: []
 *      description: Update data of a specific user
 *      parameters:
 *          - name : id
 *            description : User id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          $ref: '#/components/requestBodies/UpdateUser'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/UserUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/UserDoesNotHaveAcces'
 *          500:
 *              description: Server error
 * 
 *
 */

//TODO #6 update user 
router.put('/:id',identificationMiddleware.identification, UserController.putUser);

/**
 * @swagger
 * /users:
 *  get:
 *      tags:
 *          - user
 *      description: Get users who have specific data
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/UsersAreFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdministrator'
 *          500:
 *              description: Server error
 *
 */


router.get('/', identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, UserController.getUsers);

module.exports = router;