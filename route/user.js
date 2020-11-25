const UserController = require("../controller/userController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")


/**
 * @swagger
 * /user:
 *  post:
 *      tags:
 *          - user
 *      requestBody:
 *          $ref: '#/components/requestBodies/User'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserRegistered'
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
 */

router.post('/',  UserController.postUser);

router.post('/actions/login', UserController.loginUser);
//TODO #6 update user 
router.put('/:id',identificationMiddleware.identification, UserController.putUser);

module.exports = router;