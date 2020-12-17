const RankingDAO = require("../dao/rankingDAO");

module.exports.createRanking =  async (client, ranking, userId) =>{
    
    await RankingDAO.insertRanking(client, ranking, userId);

    return;
};

module.exports.deleteRanking =  async (client, rankingId) =>{
    const {rowCount} =  await RankingDAO.deleteRanking(client, rankingId);
    return rowCount;
};


