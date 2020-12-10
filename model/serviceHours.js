const ServiceHoursDAO = require("../dao/serviceHoursDAO");

module.exports.createServicesHours = async (client, serviceHours, userId) => {

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