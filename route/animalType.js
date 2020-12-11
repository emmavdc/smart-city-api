const AnimalTypeController = require("../controller/animalTypeController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")

/**
 * @swagger
 * /animalTypes:
 *  get:
 *      tags:
 *          - animal type
 *      security:
 *          - bearerAuth: []
 *      description: Get all the animal types
 *      responses:
 *          200:
 *              $ref: '#/components/responses/AnimalTypesAreFound'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 */

router.get('/',identificationMiddleware.identification,AnimalTypeController.getAnimalTypes);

/**
 * @swagger
 * /animalTypes/supplier:
 *  get:
 *      tags:
 *          - animal type
 *      security:
 *          - bearerAuth: []
 *      description: Get all the animal types of a specific supplier
 *      responses:
 *          200:
 *              $ref: '#/components/responses/SupplierAnimalTypesAreFound'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 */

router.get('/supplier',identificationMiddleware.identification,AnimalTypeController.getSupplierAnimalTypes);

/**
 * @swagger
 * /animalTypes/supplier:
 *  post:
 *      tags:
 *          - animal type
 *      security:
 *          - bearerAuth: []
 *      description: Add a supplier animal type
 *      requestBody:
 *          $ref: '#/components/requestBodies/UserAnimaltype'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserAnimaltypeAdded'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 */



router.post('/supplier', identificationMiddleware.identification, AnimalTypeController.postSupplierAnimal);

/**
 * @swagger
 * /animalTypes/supplier/{id}:
 *  delete:
 *      tags:
 *          - animal type
 *      security:
 *          - bearerAuth: []
 *      description: Delete a supplier animal type accepted
 *      parameters:
 *          - name : id
 *            description : animal type id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/UserAnimaltypeDeleted'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *               $ref: '#/components/responses/UserAnimaltypeNotDeleted'
 *          500:
 *              description: Server error
 */


router.delete('/supplier/:id', identificationMiddleware.identification, AnimalTypeController.deleteSupplierAnimal);



module.exports = router;