const UserRouter = require('./user');
const UserRouter2 = require('./user-v2');
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

router.use("/v2/users", UserRouter2);

module.exports = router;

