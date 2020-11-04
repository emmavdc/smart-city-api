const UserController = require("../controller/userController");
const Router = require("express-promise-router");
const router = new Router;

router.post('/',  UserController.postUser);
router.post('/actions/login',  UserController.loginUser);

module.exports = router;