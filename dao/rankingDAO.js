const UserDAO = require("./userDAO");

module.exports.insertRanking = async(client, ranking, userId) =>{
    const customer = await UserDAO.selectCustomer(client, userId);

    return await client.query(`
    INSERT INTO smartcity."ranking"(number_of_stars, review, customer_id, supplier_id, service_hours_id) 
    VALUES($1,$2, $3,$4,$5)`,
    [
        ranking.numberOfStars,
        ranking.review,
        customer[0].customer_id,
        ranking.supplierId,
        ranking.serviceHoursId
    ]);
};