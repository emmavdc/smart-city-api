const ServiceHoursController = require("../controller/serviceHoursController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification");


router.post('/', identificationMiddleware.identification, ServiceHoursController.postServiceHours);



module.exports = router;