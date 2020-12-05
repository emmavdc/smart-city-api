const AnimalTypeController = require("../controller/animalTypeController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")



router.get('/',identificationMiddleware.identification,AnimalTypeController.getAnimalTypes);
router.get('/supplier',identificationMiddleware.identification,AnimalTypeController.getSupplierAnimalTypes);
router.post('/', identificationMiddleware.identification, AnimalTypeController.postSupplierAnimal);
router.delete('/:id', identificationMiddleware.identification, AnimalTypeController.deleteSupplierAnimal);



module.exports = router;