const UserDAO = require("./userDAO");

module.exports.insertServicesHours = async (client, serviceHours, userId) => {

    const customer = await UserDAO.selectCustomer(client, userId);
    const supplier = await UserDAO.selectSupplierByEmail(client, serviceHours.emailSupplier);

     await client.query(`
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
       AND start_date_time <=  TO_DATE($10, 'yyyy-mm-dd HH24:MI:SS')
       AND end_date_time >=  TO_DATE($11, 'yyyy-mm-dd HH24:MI:SS'))`,
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
        serviceHours.endDateTime]);
    
        return;
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
       to_char(sh.start_date_time,'DD-MM-YYYY HH24:MI:SS'),
       to_char(sh.end_date_time,'DD-MM-YYYY HH24:MI:SS'),
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
       to_char(sh.start_date_time,'DD-MM-YYYY HH24:MI:SS'),
       to_char(sh.end_date_time,'DD-MM-YYYY HH24:MI:SS'),
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