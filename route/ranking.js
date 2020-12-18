const RankingController = require("../controller/rankingController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification");
const authorizationMiddleware = require("../middleware/authorization")


/**
 * @swagger
 * /v1/rankings:
 *  post:
 *      tags:
 *          - ranking
 *      security:
 *          - bearerAuth: []
 *      description: A ranking is created
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddRanking'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/RankingAdded'
 *          400:
 *               description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 *
 */

router.post('/', identificationMiddleware.identification, RankingController.postRanking);

/**
 * @swagger
 * /v1/rankings/{id}:
 *  delete:
 *      tags:
 *          - ranking
 *      security:
 *          - bearerAuth: []
 *      description: Admin delete one of rankings
 *      parameters:
 *          - name : id
 *            description : Ranking id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          204:
 *              $ref: '#/components/responses/RankingDeleted'
 *          400:
 *               description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              $ref: '#/components/responses/RankingNotFound'
 *          403:
 *              $ref: '#/components/responses/mustBeAdministrator'
 *          500:
 *              description: Server error
 */

router.delete('/:id', identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, RankingController.deleteRanking);

/**
 * @swagger
 * /v1/rankings:
 *  get:
 *      tags:
 *          - ranking
 *      description: Get rankings which have specific data
 *      parameters:
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
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/RankingsAreFound'
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

router.get('/', identificationMiddleware.identification,authorizationMiddleware.mustBeAdministrator, RankingController.getRankings);
module.exports = router;