const UserRouter = require('./user');
const AnimalRouter = require('./animal');
const router = require("express").Router();

router.use("/users", UserRouter);
router.use("/animals", AnimalRouter);

module.exports = router;

