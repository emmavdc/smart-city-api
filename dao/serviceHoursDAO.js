const UserDAO = require("./userDAO");

module.exports.insertServicesHours = async (client, serviceHours, userId) => {

    const customer = await UserDAO.selectCustomer(client, userId);
    const supplier = await UserDAO.selectSupplierByEmail(client, serviceHours.emailSupplier);

    return  await client.query(`
    INSERT INTO smartcity."service_hours" (start_date_time, end_date_time,
         type, description_demande, status, customer_id, supplier_id)
    VALUES($1,$2,$3,$4,$5)`,
        [serviceHours.startDateTime,
        serviceHours.endDateTime,
        serviceHours.type,
        serviceHours.description,
        serviceHours.status,
        customer[0].customer_id,
        supplier[0].supplier_id]);
};