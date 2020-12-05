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
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddUser'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserRegistered'
 *          400:
 *               $ref: '#/components/responses/UserNotRegistered'
 *          500:
 *              description: Server error
 *  get:
 *      tags:
 *          - user
 *      requestBody:
 *          $ref: '#/components/requestBodies/GetUsers'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/UsersAreGet'
 *          500:
 *              description: Server error
 * 
 * /actions/login:
 *  post:
 *      tags:
 *          - login
 *      requestBody:
 *          $ref: '#/components/requestBodies/Login'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/LoginAccepted'
 *          401:
 *              $ref: '#/components/responses/LoginRejected'
 *          500:
 *              description: Server error
 * 
 * 
 * /users/{id}:
 *  put:
 *      tags:
 *          - user
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
 *          403:
 *              $ref: '#/components/responses/UserDoesNotHaveAcces'
 *          500:
 *              description: Server error
 * 
 *  
 *
 */

router.post('/',  UserController.postUser);

router.post('/actions/login', UserController.loginUser);

router.post('/actions/addadmin', UserController.addAdminUser);
//TODO #6 update user 
router.put('/:id',identificationMiddleware.identification, UserController.putUser);

router.get('/', identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, UserController.getUsers);
//router.get('/', UserController.getUsers);

module.exports = router;