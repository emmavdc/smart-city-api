module.exports.insertAbsence = async(client, absence, userId) =>{
    const {rows : supplier} = await client.query(`
    SELECT s.supplier_id
    FROM smartcity."supplier" s, smartcity."user" u
    WHERE u.user_id = s.user_id
    AND u.user_id = $1`, [userId]);

    return await client.query(`
    INSERT INTO smartcity."absence"(date, supplier_id) 
    VALUES($1,$2)`, [absence.date, supplier[0].supplier_id]);

};

module.exports.deleteAbsence = async(client, absence_id,userId) =>{

    const {rows : supplier} = await client.query(`
    SELECT s.supplier_id, s.user_id
    FROM smartcity."supplier" s, smartcity."user" u
    WHERE u.user_id = s.user_id
    AND u.user_id = $1`, [userId]);

    const {rowCount} = await client.query(`DELETE FROM smartcity."absence" WHERE absence_id = $1 AND supplier_id = $2`, [absence_id,supplier[0].supplier_id]);

    return rowCount;
};

module.exports.selectAbsences = async(client,userId) =>{

    const {rows : supplier} = await client.query(`
    SELECT s.supplier_id
    FROM smartcity."supplier" s, smartcity."user" u
    WHERE u.user_id = s.user_id
    AND u.user_id = $1`, [userId]);

   return await client.query(`
    SELECT *
    FROM smartcity."absence" 
    WHERE supplier_id = $1`, [supplier[0].supplier_id]);
};


