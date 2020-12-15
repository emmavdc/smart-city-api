const router = require("../route/serviceHours");
const UserDAO = require("./userDAO");

module.exports.insertServicesHours = async (client, serviceHours, userId) => {

    const customer = await UserDAO.selectCustomer(client, userId);
    const supplier = await UserDAO.selectSupplierByEmail(client, serviceHours.emailSupplier);

    const {rowCount} = await client.query(`
    INSERT INTO smartcity."service_hours" (start_date_time, end_date_time,
        type, description_demande, status,animal_id, customer_id, supplier_id)
    SELECT $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8
    WHERE NOT EXISTS
    (SELECT *
        FROM smartcity."service_hours"
        WHERE type = $9
        AND (to_date($10, 'yyyy-mm-dd HH24:MI:SS') BETWEEN  start_date_time and end_date_time)
        AND (to_date($11, 'yyyy-mm-dd HH24:MI:SS') BETWEEN  start_date_time and end_date_time))
    AND NOT EXISTS(
        SELECT *
        FROM smartcity."absence"
        WHERE date BETWEEN to_date($12, 'yyyy-mm-dd HH24:MI:SS') 
            and to_date($13, 'yyyy-mm-dd HH24:MI:SS')
    )`,
        [serviceHours.startDateTime,
        serviceHours.endDateTime,
        serviceHours.type,
        serviceHours.description,
        serviceHours.status,
        serviceHours.animalId,
        customer[0].customer_id,
        supplier[0].supplier_id,
        serviceHours.type,
        serviceHours.startDateTime,
        serviceHours.endDateTime,
        serviceHours.startDateTime,
        serviceHours.endDateTime]);
    
        return rowCount;
};

module.exports.updateServiceHours = async(client, serviceHoursId, serviceHours, userId) =>{
    
    const supplier = await UserDAO.selectSupplier(client, userId);

    return await client.query(`
    UPDATE smartcity."service_hours"
    SET description_response = $1, status =$2
    WHERE supplier_id = $3
    AND service_hours_id = $4`,
    [
        serviceHours.description,
        serviceHours.status,
        supplier[0].supplier_id,
        serviceHoursId
    ]);
};


module.exports.selectServicesHoursAsACustomer = async(client, userId) =>{
    const customer = await UserDAO.selectCustomer(client, userId);

    return await client.query(`
    SELECT 
       to_char(sh.start_date_time,'DD-MM-YYYY HH24:MI:SS') start_date_time,
       to_char(sh.end_date_time,'DD-MM-YYYY HH24:MI:SS') end_date_time,
       sh.status,
       sh.description_response,
       sh.type,
       u.firstname,
       u.phone,
       a.name,
       a.breed,
       a.review,
       a.weight,
       at.label
    FROM smartcity."service_hours" sh,
    smartcity."user" u,
    smartcity."supplier" s,
    smartcity."animal" a,
    smartcity."animal_type" at
    WHERE sh.supplier_id = s.supplier_id
    AND s.user_id = u.user_id
    AND sh.animal_id = a.animal_id
    AND a.animal_type_id = at.animal_type_id
    AND sh.customer_id = $1`,
    [
        customer[0].customer_id
    ]);
};

module.exports.selectServicesHoursAsASupplier = async(client, userId) =>{
    const supplier = await UserDAO.selectSupplier(client, userId);

    return await client.query(`
    SELECT 
       to_char(sh.start_date_time,'DD-MM-YYYY HH24:MI:SS') start_date_time,
       to_char(sh.end_date_time,'DD-MM-YYYY HH24:MI:SS') end_date_time,
       sh.status,
       sh.description_response,
       sh.type,
       u.firstname,
       u.phone,
       a.name,
       a.breed,
       a.review,
       a.weight,
       at.label
    FROM smartcity."service_hours" sh,
    smartcity."user" u,
    smartcity."customer" c,
    smartcity."animal" a,
    smartcity."animal_type" at
    WHERE sh.customer_id = c.customer_id
    AND c.user_id = u.user_id
    AND sh.animal_id = a.animal_id
    AND a.animal_type_id = at.animal_type_id
    AND sh.supplier_id = $1 `, [supplier[0].supplier_id]);
};

module.exports.deleteServiceHours = async(client, serviceHoursId) =>{
    return await client.query(`
    DELETE FROM smartcity."service_hours"
    WHERE service_hours_id = $1`, [serviceHoursId]);
};

module.exports.selectServicesHours = async(client, filter) =>{
   if(!filter.supplierLastame){
       filter.supplierLastame = "";
   }

    if(!filter.customerLastame){
       filter.customerLastame = "";
   }

    if(!filter.startDate){
       filter.startDate = "";
   }

    if(!filter.type){
       filter.type = "";
   }

   return await client.query(`
   SELECT sh.service_hours_id, supus.lastname as supplier_lastname,
        supus.firstname as supplier_firstname,
        cusus.lastname as customer_lastname,
        cusus.firstname as customer_firstname,
        to_char(sh.start_date_time,'DD-MM-YYYY HH24:MI:SS') start_date_time,
        to_char(sh.end_date_time,'DD-MM-YYYY HH24:MI:SS') end_date_time,
        sh.type
   FROM smartcity."service_hours" sh
   JOIN smartcity."supplier" as sup ON sup.supplier_id = sh.supplier_id
   JOIN smartcity."customer" as cus ON cus.customer_id = sh.customer_id
   JOIN smartcity."user" as cusus ON cusus.user_id = cus.user_id
   JOIN smartcity."user" as supus ON supus.user_id = sup.user_id
   WHERE supus.lastname like $1
     AND cusus.lastname like $2
     AND CAST(sh.start_date_time AS varchar) like $3
     AND sh.type like $4`, 
     [
        "%" + filter.supplierLastame + "%", 
        "%" + filter.customerLastame + "%",
        "%" + filter.startDate + "%",
        "%" + filter.type + "%"
     ]);
};