const ServiceHoursController = require("../controller/serviceHoursController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification");
const authorizationMiddleware = require("../middleware/authorization")


router.post('/', identificationMiddleware.identification, ServiceHoursController.postServiceHours);
router.patch('/:id',identificationMiddleware.identification, ServiceHoursController.patchServiceHours);
router.get('/customer', identificationMiddleware.identification, ServiceHoursController.getServicesHoursAsACustomer);
router.get('/supplier', identificationMiddleware.identification, ServiceHoursController.getServicesHoursAsASupplier);
router.delete('/:id', identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, ServiceHoursController.deleteServiceHours);


module.exports = router;