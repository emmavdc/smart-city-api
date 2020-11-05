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
 */

router.post('/',  UserController.postUser);

router.post('/actions/login', UserController.loginUser);
//TODO #6 update user 
router.patch('/:id', UserController.patchUser);

module.exports = router;