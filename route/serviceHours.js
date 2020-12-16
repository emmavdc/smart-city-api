const ServiceHoursController = require("../controller/serviceHoursController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification");
const authorizationMiddleware = require("../middleware/authorization")

/**
 * @swagger
 * /serviceshours:
 *  post:
 *      tags:
 *          - service hours
 *      security:
 *          - bearerAuth: []
 *      description: A service hours is created bu the customer
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddServicesHour'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ServiceHoursAdded'
 *          400:
 *               description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          409:
 *              $ref: '#/components/responses/ServiceHoursNotAvailable'
 *          500:
 *              description: Server error
 *
 */
router.post('/', identificationMiddleware.identification, ServiceHoursController.postServiceHours);

/**
 * @swagger
 * /serviceshours/{id}:
 *  patch:
 *      tags:
 *          - service hours
 *      security:
 *          - bearerAuth: []
 *      description: A service hours is updated by the supplier
 *      parameters:
 *          - name : id
 *            description : Service hours id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          $ref: '#/components/requestBodies/UpdateServiceHours'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ServiceHoursUpdated'
 *          400:
 *               description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 *
 */

router.patch('/:id',identificationMiddleware.identification, ServiceHoursController.patchServiceHours);

/**
 * @swagger
 * /serviceshours/customer:
 *  get:
 *      tags:
 *          - service hours
 *      security:
 *          - bearerAuth: []
 *      description: Get services hours as a customer
 *      responses:
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          200:
 *               $ref: '#/components/responses/CustomerServicesHoursReturned'
 *          500:
 *              description: Server error
 */

router.get('/customer', identificationMiddleware.identification, ServiceHoursController.getServicesHoursAsACustomer);

/**
 * @swagger
 * /serviceshours/supplier:
 *  get:
 *      tags:
 *          - service hours
 *      security:
 *          - bearerAuth: []
 *      description: Get services hours as a supplier
 *      responses:
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          200:
 *               $ref: '#/components/responses/SupplierServicesHoursReturned'
 *          500:
 *              description: Server error
 */

router.get('/supplier', identificationMiddleware.identification, ServiceHoursController.getServicesHoursAsASupplier);

/**
 * @swagger
 * /serviceshours/{id}:
 *  delete:
 *      tags:
 *          - service hours
 *      security:
 *          - bearerAuth: []
 *      description: Admin delete one of services hours
 *      parameters:
 *          - name : id
 *            description : Service hours id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          204:
 *              $ref: '#/components/responses/ServiceHoursDeleted'
 *          400:
 *               description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdministrator'
 *          500:
 *              description: Server error
 */
router.delete('/:id', identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, ServiceHoursController.deleteServiceHours);


/**
 * @swagger
 * /serviceshours:
 *  get:
 *      tags:
 *          - service hours
 *      description: Get services hours which have specific data
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ServicesHoursAreFound'
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdministrator'
 *          500:
 *              description: Server error
 *
 */

router.get('/', identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, ServiceHoursController.getServicesHours);

module.exports = router;