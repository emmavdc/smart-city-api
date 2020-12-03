const AbsenceController = require("../controller/absenceController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification")


router.post('/', identificationMiddleware.identification, AbsenceController.postAbsence);
router.delete('/:id', identificationMiddleware.identification, AbsenceController.deleteAbsence);
router.get('/',identificationMiddleware.identification,AbsenceController.getAbsences)

module.exports = router;