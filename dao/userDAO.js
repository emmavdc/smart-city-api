module.exports.insertUser = async (client, user) => {
    const {rows: newUser} = await client.query(`
        INSERT INTO smartcity."user" (email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING user_id`, [user.email, user.password, user.firstname, user.lastname, 
                                                                 user.phone, user.isAdmin, user.locality, user.postalCode,
                                                                 user.streetNumber, user.streetName, user.country]
    );

    if(user.customer != null){
        await client.query(`
        INSERT INTO smartcity."customer"(search_walker, search_host, user_id) 
        VALUES ($1, $2, $3)`, [user.customer.searchWalker, user.customer.searchHost,newUser[0].user_id]
        );
    }

    if(user.supplier != null){
        await client.query(`
        INSERT INTO smartcity."supplier"(is_host, is_animal_walker, user_id) 
        VALUES ($1, $2, $3)`, [user.supplier.isHost, user.supplier.isAnimalWalker, newUser[0].user_id]
        );
    }

    return;
}

module.exports.selectUser = async (client, user) => {
    return await client.query(`
        SELECT  user_id, email, password, firstname, lastname, phone,
                is_admin, locality, postal_code, street_number,
                street_name, country 
        FROM smartcity."user"
        WHERE email = $1`, [user.email]);
}