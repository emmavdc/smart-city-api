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
    const userId = req.session.userId;
    const absence = req.body;

    if (!absence.date) {
        res.sendStatus(400);
        return;
      }
    
    const client = await pool.connect();
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
 *      AbsenceNotFound:
 *          description: User Absence not found
 * 
 */

module.exports.deleteAbsence = async(req, res) =>{
    const absenceId = req.params.id;
    const userId = req.session.userId;

    if (isNaN(absenceId)) {
        res.sendStatus(400);
        return;
    }
    
    const client = await pool.connect();
    try{
        const rowCount = await AbsenceModel.deleteAbsence(client, absenceId,userId);
        if(rowCount == 1){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(404);
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
    const userId = req.session.userId;

    const client = await pool.connect();
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