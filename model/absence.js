const AbsenceDAO = require("../dao/absenceDAO");

module.exports.createAbsence =  async (client, absence, userId) =>{
    
    await AbsenceDAO.insertAbsence(client, absence, userId);

    return;
};

module.exports.deleteAbsence =  async (client, absence_id,userId) =>{
    
    const rowCount = await AbsenceDAO.deleteAbsence(client, absence_id,userId);

    return rowCount;
};

module.exports.getAbsences =  async (client,userId) =>{
    
    const {rows : absences} = await AbsenceDAO.selectAbsences(client,userId);

    return absences;
};