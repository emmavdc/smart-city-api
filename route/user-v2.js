const UserController = require("../controller/userController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")
const authorizationMiddleware = require("../middleware/authorization")

router.post('/',  UserController.postUserV2);

router.post('/actions/login', UserController.loginUser2);

router.get('/:id',identificationMiddleware.identification, UserController.getUser2);
router.put('/:id',identificationMiddleware.identification, UserController.putUser2);

module.exports = router;