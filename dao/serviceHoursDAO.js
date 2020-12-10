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
        supplier[0].supplier_id,serviceHours.type,serviceHours.startDateTime,  serviceHours.endDateTime]);
    
        return;
};