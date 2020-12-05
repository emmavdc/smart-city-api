module.exports.mustBeAdministrator = (req, res, next) => {
    if(req.session !== undefined && req.session.isAdmin === true){
        next();
    } else {
        res.sendStatus(403);
    }
}
