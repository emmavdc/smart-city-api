const pool = require("../utils/database");
const AbsenceModel = require("../model/absence");


module.exports.postAbsence = async(req, res) =>{
    const client = await pool.connect();
    const userId = req.session.userId;
    const absence = req.body;

    try{
        await AbsenceModel.createAbsence(client, absence, userId);
        res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    finally{
        client.release();  
    }

};

module.exports.deleteAbsence = async(req, res) =>{
    const client = await pool.connect();
    const absence_id = req.params.id;
    const userId = req.session.userId;

    try{
        const rowCount = await AbsenceModel.deleteAbsence(client, absence_id,userId);
        if(rowCount != 0){
            res.sendStatus(204);
        }
        else{
            res.sendStatus(403);
        }
       
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    finally{
        client.release();  
    }

};

module.exports.getAbsences = async(req, res) =>{
    const client = await pool.connect();
    const userId = req.session.userId;

    try{
        const absences = await AbsenceModel.getAbsences(client,userId);
        res.json(absences);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    finally{
        client.release();  
    }

};