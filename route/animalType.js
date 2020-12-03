const AnimalTypeController = require("../controller/animalTypeController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")



router.get('/',identificationMiddleware.identification,AnimalTypeController.getAnimalTypes);



module.exports = router;