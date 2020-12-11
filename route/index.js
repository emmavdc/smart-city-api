const UserRouter = require('./user');
const AbsenceRouter = require('./absence');
const AnimalTypeRouter = require('./animalType');
const AnimalRouter = require('./animal');
const ServiceHoursRouter = require('./serviceHours');
const router = require("express").Router();

router.use("/users", UserRouter);
router.use("/absences", AbsenceRouter);
router.use("/animalTypes", AnimalTypeRouter);
router.use("/animals", AnimalRouter);
router.use("/serviceHours", ServiceHoursRouter);

module.exports = router;

