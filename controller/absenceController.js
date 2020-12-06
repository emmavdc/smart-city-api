const pool = require("../utils/database");
const AbsenceModel = require("../model/absence");

/**
 * @swagger
 * components:
 *  responses:
 *      AbsenceAdded:
 *          description: User Absence added
 *
 *  requestBodies:
 *      AddAbsence:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          date:
 *                              type: string
 *                      required:
 *                          - date
 * 
 */

module.exports.postAbsence = async(req, res) =>{
    const client = await pool.connect();
    const userId = req.session.userId;
    const absence = req.body;

    //^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$

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

/**
 * @swagger
 * components:
 *  responses:
 *      AbsenceDeleted:
 *          description: User Absence deleted
 * 
 */

module.exports.deleteAbsence = async(req, res) =>{
    const client = await pool.connect();
    const absence_id = req.params.id;
    const userId = req.session.userId;

    try{
        const rowCount = await AbsenceModel.deleteAbsence(client, absence_id,userId);
        if(rowCount != 0){
            res.sendStatus(200);
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

/**
 * @swagger
 * components:
 *  responses:
 *      AbsencesReturned:
 *          description: The absences are returned
 * 
 */

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