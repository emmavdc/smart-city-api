const ServiceHoursController = require("../controller/serviceHoursController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification");
const authorizationMiddleware = require("../middleware/authorization")

/**
 * @swagger
 * /v1/serviceshours:
 *  post:
 *      tags:
 *          - service hours
 *      security:
 *          - bearerAuth: []
 *      description: A service hours is created by the customer
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
 * /v1/serviceshours/{id}:
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
 * /v1/serviceshours/customer:
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
 * /v1/serviceshours/supplier:
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
 * /v1/serviceshours/{id}:
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
 * /v1/serviceshours:
 *  get:
 *      tags:
 *          - service hours
 *      description: Get services hours which have specific data
 *      parameters:
 *          - in : query
 *            name : supplierLastame
 *            description: Get users who have specific supplier lastame data
 *            schema:
 *              type: string
 *          - in : query
 *            name : customerLastame
 *            description: Get users who have specific customer lastame data
 *            schema:
 *              type: string
 *          - in : query
 *            name : startDate
 *            description: Get users who have specific start date data
 *            schema:
 *              type: string
 *          - in : query
 *            name : type
 *            description: Get users who have specific type data
 *            schema:
 *              type: string
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