const UserController = require("../controller/userController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")
const authorizationMiddleware = require("../middleware/authorization")


/**
 * @swagger
 * /v1/users:
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
 *          409:
 *               $ref: '#/components/responses/UserAlreadyExist'
 *          500:
 *              description: Server error
 */

router.post('/',  UserController.postUser);


/**
 * @swagger
 * /v1/users/actions/login:
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

/*Not documented fonction, used only by the creator :-) */
router.post('/actions/addadmin', UserController.addAdminUser);

/**
 * @swagger
 * /v1/users/{id}:
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
 *              description: Bad request
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


//patch user for admin

/**
 * @swagger
 * /v1/users/{id}:
 *  patch:
 *      tags:
 *          - user
 *      security:
 *          - bearerAuth: []
 *      description: Update data of a specific user by admin
 *      parameters:
 *          - name : id
 *            description : User id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          $ref: '#/components/requestBodies/UpdateUserByAdmin'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/UserUpdatedByAdmin'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdministrator'
 *          500:
 *              description: Server error
 * 
 *
 */

router.patch('/:id',identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, UserController.patchUser);


/**
 * @swagger
 * /v1/users/{id}:
 *  get:
 *      tags:
 *          - user
 *      security:
 *          - bearerAuth: []
 *      description: Get data of a specific user
 *      parameters:
 *          - name : id
 *            description : User id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/UserIsFound'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/UserDoesNotHaveAcces'
 *          500:
 *              description: Server error
 * 
 *
 */

router.get('/:id',identificationMiddleware.identification, UserController.getUser);

/**
 * @swagger
 * /v1/users:
 *  get:
 *      tags:
 *          - user
 *      description: Get users who have specific data
 *      parameters:
 *          - in : query
 *            name : lastname
 *            description: Get users who have specific lastname data
 *            schema:
 *              type: string
 *          - in : query
 *            name : locality
 *            description: Get users who have specific locality data
 *            schema:
 *              type: string
 *          - in : query
 *            name : email
 *            description: Get users who have specific email data
 *            schema:
 *              type: string
 *            
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/UsersAreFound'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdministrator'
 *          500:
 *              description: Server error
 *
 */


router.get('/', identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, UserController.getUsers);

/**
 * @swagger
 * /v1/users/{id}:
 *  delete:
 *      tags:
 *          - user
 *      description: Delete user
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name : id
 *            description : User id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          204:
 *              $ref: '#/components/responses/UserDeleted'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdministrator'
 *          404:
 *              $ref: '#/components/responses/UserNotDeleted'
 *          500:
 *              description: Server error
 *
 */

router.delete('/:id', identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, UserController.deleteUser);

/**
 * @swagger
 * /v1/users/actions/addbyadmin:
 *  post:
 *      tags:
 *          - user
 *      description: Create new user as an administrator
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddUserByAdmin'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserRegisteredByAdmin'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdministrator'
 *          409:
 *               $ref: '#/components/responses/UserAlreadyExist'
 *          500:
 *              description: Server error
 */



router.post('/actions/addbyadmin',identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, UserController.addUserByAdmin);

module.exports = router;