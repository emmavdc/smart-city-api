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
        await ServiceHoursModel.createServiceHours(client, servicesHours, userId);
        await client.query("COMMIT");
        res.sendStatus(201);
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