const UserRouter = require('./user');
const AbsenceRouter = require('./absence');
const AnimalTypeRouter = require('./animalType');
const AnimalRouter = require('./animal');
const ServiceHoursRouter = require('./serviceHours');
const RankingRouter = require('./ranking');
const router = require("express").Router();

router.use("/v1/users", UserRouter);
router.use("/v1/absences", AbsenceRouter);
router.use("/v1/animalTypes", AnimalTypeRouter);
router.use("/v1/animals", AnimalRouter);
router.use("/v1/servicesHours", ServiceHoursRouter);
router.use("/v1/rankings", RankingRouter);

module.exports = router;

