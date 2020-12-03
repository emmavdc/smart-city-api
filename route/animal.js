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


 // Encore un peu flou ça :/
router.get('/animals/:user_id',  AnimalController.getAnimals);

router.post('/',  AnimalController.addAnimal);

// router update

module.exports = router;