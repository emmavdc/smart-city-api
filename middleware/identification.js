/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  responses:
 *      ErrorJWT:
 *          description: JWT is not valid
 *      MissingJWT:
 *          description: JWT is not present
 */
const jwt = require('jsonwebtoken');

module.exports.identification = async (req, res, next) => {
    const headerAuth = req.get('authorization');
    if(headerAuth && headerAuth.includes("Bearer")){
        const bearerToken =  headerAuth.split(' ')[1];
        const decodedToken = jwt.verify(bearerToken, process.env.SECRET);
        if (decodedToken) {
            req.session = decodedToken.value;
            next();
        }
        else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }
}
