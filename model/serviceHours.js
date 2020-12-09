const ServiceHoursDAO = require("../dao/serviceHoursDAO");

module.exports.createServicesHours = async (client, serviceHours, userId) => {
   return await ServiceHoursDAO.insertServicesHours(client, serviceHours, userId);
};