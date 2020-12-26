const UserController = require("../controller/userController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")
const authorizationMiddleware = require("../middleware/authorization")

router.post('/',  UserController.postUserV2);

module.exports = router;