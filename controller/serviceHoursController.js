const pool = require("../utils/database");
const ServiceHoursModel = require("../model/serviceHours");
const e = require("express");


module.exports.postServiceHours = async(req, res) =>{
    const client = await pool.connect();
    const servicesHours = req.body;
    const userId = req.session.userId;

    // when serviceHours is created, status is waiting
    servicesHours.status = "en attente";

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

module.exports.patchServiceHours = async(req, res) =>{
    const client = await pool.connect();
    const serviceHours = req.body;
    const serviceHoursId = req.params.id;
    const userId = req.session.userId;
    serviceHours.status = serviceHours.isAcceptedRequest ? "accepté" : "refusé";

    try {
        const rowCount = await ServiceHoursModel.updateServiceHours(client, serviceHoursId, serviceHours, userId);
        if(rowCount != 0){
            res.sendStatus(201);
        }
        else{
            res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
    finally{
        client.release();
    }

};

module.exports.getServicesHoursAsACustomer = async(req, res) =>{
    const client = await pool.connect();
    const userId = req.session.userId;

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

module.exports.getServicesHoursAsASupplier = async(req, res) =>{
    const client = await pool.connect();
    const userId = req.session.userId;

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

module.exports.deleteServiceHours = async(req, res) =>{
    const client = await pool.connect();
    const serviceHoursId = req.params.id;
    
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

module.exports.getServicesHours = async(req, res) =>{
    const client = await pool.connect();
    const filters = req.query;

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