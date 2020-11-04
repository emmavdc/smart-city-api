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

    try {
        await client.query("BEGIN;");
        UserModel.createUser(client, user);
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
        if(await UserModel.loginUser(client, user)) {
            res.sendStatus(200);
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
