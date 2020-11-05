const pool = require('../utils/database');
const UserModel = require("../model/user");


module.exports.postUser = async (req, res) => {
    const client = await pool.connect();
    const user = req.body;
   
    //TODO #5 validate type
    if (user.isAdmin && typeof user.isAdmin !== "boolean") {
        res.sendStatus(400);
        return;
    }

    if(typeof user.postalCode !=- "integer"){
        res.sendStatus(400);
        return;
    }

    if(user.customer != null){
        if(typeof user.customer.searchWalker !== "boolean" || typeof user.customer.searchHost !== "boolean"){
            res.sendStatus(400); return;
        } 
    }

    if(user.supplier != null){
        if(typeof user.supplier.isHost !== "boolean" || typeof user.supplier.isAnimalWalker !== "boolean"){
            res.sendStatus(400); return;
        } 
    }

    try {
        await client.query("BEGIN;");
        await UserModel.createUser(client, user);
        await client.query("COMMIT");
        res.sendStatus(201);
    } catch (e) {
        await client.query("ROLLBACK;");
        console.log(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}

module.exports.loginUser = async (req, res) => {
    const client = await pool.connect();
    const user = req.body;
    
    try {
        const jwt = await UserModel.loginUser(client, user);
        if(jwt) {
            res.status(200).send(jwt);
        }
        else {
            res.sendStatus(401);
        }
        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}

module.exports.patchUser = async(req, res) =>{
    const client = await pool.connect();

}
