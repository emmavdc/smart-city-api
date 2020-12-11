const AbsenceController = require("../controller/absenceController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification");


/**
 * @swagger
 * /absences:
 *  post:
 *      tags:
 *          - absence
 *      security:
 *          - bearerAuth: []
 *      description: User add a new absence
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddAbsence'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AbsenceAdded'
 *          400:
 *               description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 *
 */
router.post('/', identificationMiddleware.identification, AbsenceController.postAbsence);

/**
 * @swagger
 * /absences/{id}:
 *  delete:
 *      tags:
 *          - absence
 *      security:
 *          - bearerAuth: []
 *      description: User delete one of his absences
 *      parameters:
 *          - name : id
 *            description : Absence id
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/AbsenceDeleted'
 *          400:
 *               description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 */
router.delete('/:id', identificationMiddleware.identification, AbsenceController.deleteAbsence);

/**
 * @swagger
 * /absences:
 *  get:
 *      tags:
 *          - absence
 *      security:
 *          - bearerAuth: []
 *      description: Get absences of a user
 *      responses:
 *          400:
 *              description: Bad request
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          200:
 *               $ref: '#/components/responses/AbsencesReturned'
 *          500:
 *              description: Server error
 */
router.get('/',identificationMiddleware.identification,AbsenceController.getAbsences)

module.exports = router;