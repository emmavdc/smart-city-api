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

module.exports.deleteRanking = async(client, rankingId) =>{
    return await client.query(`
    DELETE FROM smartcity."ranking"
    WHERE ranking_id = $1`, [rankingId]);
};

module.exports.selectRankings = async(client, filter) =>{
    if(!filter.customerLastame){
        filter.customerLastame = "";
    }
     if(!filter.startDate){
        filter.startDate = "";
    }
    return await client.query(`
    SELECT  r.ranking_id, r.number_of_stars, r.review,
        supus.lastname as supplier_lastname,
        supus.firstname as supplier_firstname,
        cusus.lastname as customer_lastname,
        cusus.firstname as customer_firstname,
        to_char(sh.start_date_time,'DD-MM-YYYY HH24:MI:SS') start_date_time,
        to_char(sh.end_date_time,'DD-MM-YYYY HH24:MI:SS') end_date_time
   FROM smartcity."ranking" r
   JOIN smartcity."service_hours" as sh ON r.service_hours_id = sh.service_hours_id
   JOIN smartcity."customer" as cus ON r.customer_id = cus.customer_id
   JOIN smartcity."supplier" as sup ON r.supplier_id = sup.supplier_id
   JOIN smartcity."user" as cusus ON cusus.user_id = cus.user_id
   JOIN smartcity."user" as supus ON supus.user_id = sup.user_id
   WHERE cusus.lastname like $1
     AND CAST(sh.start_date_time AS varchar) like $2`, 
      [ 
         "%" + filter.customerLastame + "%",
         "%" + filter.startDate + "%",
      ]);
 };