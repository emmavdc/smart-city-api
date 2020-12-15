const pool = require("../utils/database");
const ServiceHoursModel = require("../model/serviceHours");
const e = require("express");



/**
 * @swagger
 * components:
 *  responses:
 *      ServiceHoursAdded:
 *          description: Service Hour added
 *      ServiceHoursNotAvailable : 
 *          description : Service Hour not available
 *
 *  requestBodies:
 *      AddServicesHour:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          startDateTime:
 *                              type: string
 *                          endDateTime:
 *                              type: string
 *                          type:  #
 *                              type: string
 *                          description:
 *                              type: string
 *                          emailSupplier:
 *                              type: string
 *                          animalId:
 *                              type: integer
 *                      required:
 *                          - startDateTime
 *                          - endDateTime
 *                          - type
 *                          - emailSupplier
 *                          - animalId
 */

module.exports.postServiceHours = async(req, res) =>{
    const servicesHours = req.body;
    const userId = req.session.userId;

    if (
        !servicesHours.startDateTime ||
        !servicesHours.endDateTime ||
        !servicesHours.type ||
        !servicesHours.emailSupplier ||
        !servicesHours.animalId
      ) {
        res.sendStatus(400);
        return;
      }
    

    // when serviceHours is created, status is waiting
    servicesHours.status = "en attente";

    const client = await pool.connect();
    try {
        await client.query("BEGIN;");
        const rowCount = await ServiceHoursModel.createServiceHours(client, servicesHours, userId);
        if(rowCount == 1){
            await client.query("COMMIT");
            res.sendStatus(201);
        }
        else{
            await client.query("ROLLBACK;");
            res.status(409).json("la période demandée n'est pas disponible");
        }
        
    } catch (error) {
        await client.query("ROLLBACK;");
        console.log(error);
        res.sendStatus(500);
        
    }finally{
        client.release();
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      ServiceHoursUpdated:
 *          description: Service Hour updated
 *
 *  requestBodies:
 *      UpdateServiceHours:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          description:
 *                              type: string
 *                          isAcceptedRequest:
 *                              type: boolean
 *                      required:
 *                          - isAcceptedRequest
 */

module.exports.patchServiceHours = async(req, res) =>{
    const serviceHours = req.body;
    const serviceHoursId = req.params.id;
    const userId = req.session.userId;
    serviceHours.status = serviceHours.isAcceptedRequest ? "accepté" : "refusé";

    if (isNaN(serviceHoursId)) {
        res.sendStatus(400);
        return;
    }

    const client = await pool.connect();
    try {
        const rowCount = await ServiceHoursModel.updateServiceHours(client, serviceHoursId, serviceHours, userId);
        if(rowCount != 0){
            res.sendStatus(201);
        }
        else{
            res.sendStatus(400);
        }
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
    finally{
        client.release();
    }

};

/**
 * @swagger
 * components:
 *  responses:
 *      CustomerServicesHoursReturned:
 *          description: The customer services hours are returned
 * 
 */

module.exports.getServicesHoursAsACustomer = async(req, res) =>{
    const userId = req.session.userId;
    const client = await pool.connect();

    try {
        const servicesHoursAsACustomer = await ServiceHoursModel.getServicesHoursAsACustomer(client,userId);
        res.json(servicesHoursAsACustomer);
        
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
    finally{
        client.release();
    }

};

/**
 * @swagger
 * components:
 *  responses:
 *      SupplierServicesHoursReturned:
 *          description: The supplier services hours are returned
 * 
 */


module.exports.getServicesHoursAsASupplier = async(req, res) =>{
    const userId = req.session.userId;
    const client = await pool.connect();

    try {
        const servicesHoursAsASupplier = await ServiceHoursModel.getServicesHoursAsASupplier(client,userId);
        res.json(servicesHoursAsASupplier);
        
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
    finally{
        client.release();
    }

};

/**
 * @swagger
 * components:
 *  responses:
 *      ServiceHoursDeleted:
 *          description: Service Hours deleted
 * 
 */

module.exports.deleteServiceHours = async(req, res) =>{
    const serviceHoursId = req.params.id;

    if (isNaN(serviceHoursId)) {
        res.sendStatus(400);
        return;
    }
    
    const client = await pool.connect();
    try {
        const rowCount = await ServiceHoursModel.deleteServiceHours(client, serviceHoursId);
        if(rowCount == 1){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
    finally{
        client.release();
    }

};

/**
 * @swagger
 * components:
 *  responses:
 *      ServicesHoursAreFound:
 *          description: The services hours are returned
 *
 */

module.exports.getServicesHours = async(req, res) =>{
    const filters = req.query;
    const client = await pool.connect();

    try {
        const servicesHours = await ServiceHoursModel.getServicesHours(client, filters);
        res.json(servicesHours);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    finally{
        client.release();
    }
};