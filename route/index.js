const UserRouter = require('./user');
const router = require("express").Router();

router.use("/user", UserRouter);

module.exports = router;

