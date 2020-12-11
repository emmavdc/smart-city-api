const ServiceHoursDAO = require("../dao/serviceHoursDAO");

module.exports.createServiceHours = async (client, serviceHours, userId) => {

   if(serviceHours.type === "promener"){
      if(serviceHours.startDateTime.split(" ")[0] != serviceHours.endDateTime.split(" ")[0]){
         return;
      }
      else{
         if(serviceHours.startDateTime.split(" ")[1] > serviceHours.endDateTime.split(" ")[1]){
            return;
         }
      }
   }

   return await ServiceHoursDAO.insertServicesHours(client, serviceHours, userId);
};

module.exports.updateServiceHours = async(client, serviceHoursId, serviceHours, userId) =>{
   const {rowCount} = await ServiceHoursDAO.updateServiceHours(client, serviceHoursId, serviceHours, userId);
   return rowCount;
};

module.exports.getServicesHoursAsACustomer = async(client, userId) =>{
   const {rows : servicesHoursAsACustomer} = await ServiceHoursDAO.selectServicesHoursAsACustomer(client, userId);
   return servicesHoursAsACustomer;
};

module.exports.getServicesHoursAsASupplier = async(client, userId) =>{
   const {rows : servicesHoursAsASupplier} = await ServiceHoursDAO.selectServicesHoursAsASupplier(client, userId);
   return servicesHoursAsASupplier;
};


