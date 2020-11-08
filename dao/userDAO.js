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

    return newUser[0].user_id;
}

module.exports.selectUser = async (client, user) => {
    return await client.query(`
        SELECT  user_id, email, password, firstname, lastname, phone,
                is_admin, locality, postal_code, street_number,
                street_name, country 
        FROM smartcity."user"
        WHERE email = $1`, [user.email]);
}

module.exports.updateUser = async (client, user, userID) =>{

   await client.query(`
    UPDATE smartcity."user" SET email = $1, password = $2, firstname = $3,
                            lastname = $4, phone = $5, is_admin = $6,
                            locality = $7, postal_code = $8, street_number = $9,
                            street_name = $10, country = $11, picture = $12 
                            WHERE user_id = $13;`, 
                            [user.email, user.password, user.firstname, user.lastname, 
                                user.phone, user.isAdmin, user.locality, user.postalCode,
                                user.streetNumber, user.streetName, user.country, user.picture, userID]);
    
    if(user.customer != null){
        await client.query(`UPDATE smartcity."customer" SET commune = $1, search_walker = $2,
                                                         search_host = $3
                                                         WHERE user_id = $4;`,
                                                         [user.customer.commune, user.customer.searchWalker,
                                                        user.customer.searchHost, userID]);
    }

    if(user.supplier != null){
        await client.query(`UPDATE smartcity."supplier" SET is_host = $1, is_animal_walker = $2,
                                                        slogan = $3, commune = $4, weight_max = $5 
                                                        WHERE user_id = $6;`,
                                                        [user.supplier.isHost, user.supplier.isAnimalWalker,
                                                        user.supplier.slogan, user.supplier.commune,
                                                        user.supplier.weightMax, userID]);
    }

    return;
}