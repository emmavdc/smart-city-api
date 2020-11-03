const UserController = require("../controller/userController");
const Router = require("express-promise-router");
const router = new Router;

router.post('/',  UserController.postUser);

module.exports = router;