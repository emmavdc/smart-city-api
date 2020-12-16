const RankingDAO = require("../dao/rankingDAO");

module.exports.createRanking =  async (client, ranking, userId) =>{
    
    await RankingDAO.insertRanking(client, ranking, userId);

    return;
};