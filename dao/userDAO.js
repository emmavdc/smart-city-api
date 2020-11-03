module.exports.insertUser = async (client, user) => {
    return await client.query(`
        INSERT INTO smartcity."user" (email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [user.email, user.password, user.firstname, user.lastname, 
                                                                 user.phone, user.isAdmin, user.locality, user.postalCode,
                                                                 user.streetNumber, user.streetName, user.country]
    );
}