/**
 *@swagger
 * components:
 *  responses:
 *      mustBeAdministrator:
 *          description: The requested action can only be performed by an administrator
 */
module.exports.mustBeAdministrator = (req, res, next) => {
    if(req.session !== undefined && req.session.isAdmin === true){
        next();
    } else {
        res.sendStatus(403);
    }
}
