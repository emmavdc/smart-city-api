const pool = require("../utils/database");
const ServiceHoursModel = require("../model/serviceHours");
const e = require("express");


module.exports.postServiceHours = async(req, res) =>{
    const client = await pool.connect();
    const servicesHours = req.body;
    const userId = req.session.userId;

    try {
        await client.query("BEGIN;");
        await ServiceHoursModel.createServicesHours(client, servicesHours, userId);
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