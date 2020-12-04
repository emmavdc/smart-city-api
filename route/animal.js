const AnimalController = require("../controller/animalController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")

/**
 * @swagger
 * /animal:
 *  post:
 *      tags:
 *          - user
 *      requestBody:
 *          $ref: '#/components/requestBodies/Animal'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AnimalRegistered'
 *          500:
 *              description: Server error
 * 
 *
 */


router.get('/', identificationMiddleware.identification,  AnimalController.getAnimals);
router.post('/', identificationMiddleware.identification,  AnimalController.postAnimal);
router.put('/', identificationMiddleware.identification,  AnimalController.putAnimal);

module.exports = router;