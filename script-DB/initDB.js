const pool = require("../utils/database");
const fs = require("fs");
const path = require("path");

async function initDB(){
    const client = await pool.connect();
    try{
        const query = fs.readFileSync(path.join(__dirname, "createDB.SQL"), "utf-8");
        await client.query(query);
    } catch (e) {
        console.log(e);
    } finally {
        client.release();
        await pool.end();
    }
}

initDB().then(() => console.log("done"));