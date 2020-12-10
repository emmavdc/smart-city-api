const AnimalController = require("../controller/animalController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification");


router.get('/', identificationMiddleware.identification, AnimalController.getAnimals);
router.post('/', identificationMiddleware.identification, AnimalController.postAnimal);
router.delete('/:id', identificationMiddleware.identification, AnimalController.deleteAnimal);
router.put('/:id', identificationMiddleware.identification, AnimalController.putAnimal);

module.exports = router;