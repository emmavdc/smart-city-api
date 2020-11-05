const UserController = require("../controller/userController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")

router.post('/',  UserController.postUser);
router.post('/actions/login', UserController.loginUser);
//TODO #6 update user 
router.patch('/:id', UserController.patchUser);

module.exports = router;