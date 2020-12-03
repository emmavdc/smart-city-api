const UserRouter = require('./user');
const AbsenceRouter = require('./absence');
const AnimalTypeRouter = require('./animalType');
const router = require("express").Router();

router.use("/users", UserRouter);
router.use("/absences", AbsenceRouter);
router.use("/animalTypes", AnimalTypeRouter);

module.exports = router;

