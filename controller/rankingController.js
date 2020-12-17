const pool = require("../utils/database");
const RankingModel = require("../model/ranking");

/**
 * @swagger
 * components:
 *  responses:
 *      RankingAdded:
 *          description: Ranking added
 *
 *  requestBodies:
 *      AddRanking:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          numberOfStars:
 *                              type: integer
 *                          review:
 *                              type: string
 *                          supplierId:
 *                              type: integer
 *                          serviceHoursId:
 *                              type: integer
 *                      required:
 *                          - numberOfStars
 *                          - supplierId
 *                          - serviceHoursId
 *
 */

module.exports.postRanking = async(req, res) =>{
    const userId = req.session.userId;
    const ranking = req.body;

    if (!ranking.numberOfStars ||
        !ranking.supplierId ||
        !ranking.serviceHoursId) {
        res.sendStatus(400);
        return;
      }
    
    const client = await pool.connect();
    try{
        await RankingModel.createRanking(client, ranking, userId);
        res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    finally{
        client.release();  
    }

};

/**
 * @swagger
 * components:
 *  responses:
 *      RankingDeleted:
 *          description: Ranking deleted
 *      RankingNotFound : Ranking not found
 * 
 */

module.exports.deleteRanking = async(req, res) =>{
    const rankingId = req.params.id;

    if (isNaN(rankingId)) {
        res.sendStatus(400);
        return;
    }
    
    const client = await pool.connect();
    try {
        const rowCount = await RankingModel.deleteRanking(client, rankingId);
        if(rowCount == 1){
            res.sendStatus(204);
        }
        else{
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
    finally{
        client.release();
    }

};