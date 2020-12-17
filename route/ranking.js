const RankingController = require("../controller/rankingController");
const Router = require("express-promise-router");
const router = new Router;
const identificationMiddleware = require("../middleware/identification");
const authorizationMiddleware = require("../middleware/authorization")


router.post('/', identificationMiddleware.identification, RankingController.postRanking);
router.delete('/:id', identificationMiddleware.identification, authorizationMiddleware.mustBeAdministrator, RankingController.deleteRanking);

module.exports = router;