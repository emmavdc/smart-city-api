const AnimalController = require("../controller/animalController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification");


/**
 * @swagger
 * /animals:
 *  get:
 *      tags:
 *          - animal
 *      security:
 *          - bearerAuth: []
 *      description: Get animals of a user
 *      responses:
 *          200:
 *               $ref: '#/components/responses/AnimalsReturned'
 *          400:
 *               description: Bad request
 *          500:
 *              description: Server error
 */

router.get('/', identificationMiddleware.identification, AnimalController.getAnimals);

/**
 * @swagger
 * /animals:
 *  post:
 *      tags:
 *          - animal
 *      security:
 *          - bearerAuth: []
 *      description: User add a new animal
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddAnimal'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AnimalAdded'
 *          400:
 *               description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 *
 */

router.post('/', identificationMiddleware.identification, AnimalController.postAnimal);

/**
 * @swagger
 * /animals/{id}:
 *  delete:
 *      tags:
 *          - animal
 *      description: Delete animal
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name : id
 *            description : Animal id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          204:
 *              $ref: '#/components/responses/AnimalDeleted'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              $ref: '#/components/responses/AnimalNotDeleted'
 *          500:
 *              description: Server error
 *
 */

router.delete('/:id', identificationMiddleware.identification, AnimalController.deleteAnimal);

/**
 * @swagger
 * /animals/{id}:
 *  put:
 *      tags:
 *          - animal
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name : id
 *            description : Animal id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      description: User update one of his animals
 *      requestBody:
 *          $ref: '#/components/requestBodies/UpdateAnimal'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AnimalUpdated'
 *          400:
 *               description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              $ref: '#/components/responses/AnimalNotFound'
 *          500:
 *              description: Server error
 *
 */

router.put('/:id', identificationMiddleware.identification, AnimalController.putAnimal);

module.exports = router;