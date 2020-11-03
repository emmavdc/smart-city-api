const pool = require('../utils/database');
const UserModel = require("../model/user");


module.exports.postUser = async (req, res) => {
    const client = await pool.connect();
    //const {email, password, firstName, lastName, phone, isAdmin, locality, postalCode, streetNumber, streetName, country} = req.body;
    const user = req.body;
   
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
