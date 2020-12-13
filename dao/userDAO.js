module.exports.insertUser = async (client, user) => {
  const { rows: newUser } = await client.query(
    `
        INSERT INTO smartcity."user" (email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING user_id`,
    [
      user.email,
      user.password,
      user.firstname,
      user.lastname,
      user.phone,
      user.isAdmin,
      user.locality,
      user.postalCode,
      user.streetNumber,
      user.streetName,
      user.country,
    ]
  );

  if (user.customer != null) {
    await client.query(
      `
        INSERT INTO smartcity."customer"(search_walker, search_host, user_id) 
        VALUES ($1, $2, $3)`,
      [user.customer.searchWalker, user.customer.searchHost, newUser[0].user_id]

      
    );
  }

  if (user.supplier != null) {
    await client.query(
      `
        INSERT INTO smartcity."supplier"(is_host, is_animal_walker, user_id) 
        VALUES ($1, $2, $3)`,
      [user.supplier.isHost, user.supplier.isAnimalWalker, newUser[0].user_id]
    );
  }

  return newUser[0].user_id;
};

module.exports.selectUserByEmail = async (client, user) => {
  return await client.query(
    `
        SELECT  user_id, email, password, firstname, lastname, phone,
                is_admin, locality, postal_code, street_number,
                street_name, country 
        FROM smartcity."user"
        WHERE email = $1` ,
    [user.email]
  );
};

module.exports.selectUser = async (client, user_Id) => {
  return await client.query(
    `
        SELECT  u.user_id, email, password, firstname, lastname, phone,
                is_admin, locality, postal_code, street_number,
                street_name, country, 
                case when search_walker is null then false else true end,
                case when search_host is null then false else true end,
                case when is_host is null then false else true end,
                case when is_animal_walker is null then false else true end
        FROM smartcity."user" u 
        LEFT OUTER JOIN smartcity."customer" c ON c.user_id = u.user_id
        LEFT OUTER JOIN smartcity."supplier" s ON s.user_id = u.user_id
        WHERE u.user_Id = $1` ,
    [user_Id]
  );
};


module.exports.selectCustomer = async(client, userId) =>{
    const {rows : customer} = await client.query(`
    SELECT c.customer_id
    FROM smartcity."customer" c , smartcity."user" u
    WHERE u.user_id = c.user_id
    AND u.user_id = $1`, [userId]);

    return customer;
};

module.exports.selectSupplier = async(client, userId) =>{
    const {rows : supplier} = await client.query(`
    SELECT s.supplier_id
    FROM smartcity."supplier" s, smartcity."user" u
    WHERE u.user_id = s.user_id
    AND u.user_id = $1`, [userId]);

    return supplier;

};

module.exports.selectSupplierByEmail = async(client, email) =>{
  const {rows : supplier} = await client.query(`
  SELECT s.supplier_id
    FROM  smartcity."supplier" s, smartcity."user" u
    WHERE u.user_id = s.user_id
    AND u.user_id =
        (SELECT us.user_id
            FROM smartcity."user" us
            WHERE email = $1)`,[email]);
  return supplier;
};

    

module.exports.selectUsers = async (client, filter) => {
  if (!filter.lastname) {
    filter.lastname = "";
  }

  if (!filter.locality) {
    filter.locality = "";
  }

  if (!filter.email) {
    filter.email = "";
  }

  return await client.query(
    `
    SELECT  smartcity."user".user_id, email, firstname, lastname,
    locality,
    case when customer_id is null then false else true end as iscustomer,
    case when supplier_id is null then false else true end as issupplier
    FROM smartcity."user"
    LEFT OUTER JOIN smartcity."customer" ON smartcity."user".user_id = smartcity."customer".user_id
    LEFT OUTER JOIN smartcity."supplier" ON smartcity."user".user_id = smartcity."supplier".user_id
    WHERE is_admin = false
        AND   lastname like $1
        AND   email like $2
        AND   locality like $3`,
    [
      "%" + filter.lastname + "%",
      "%" + filter.email + "%",
      "%" + filter.locality + "%",
    ]
  );
};

module.exports.updateUser = async (client, user, userID) => {
  await client.query(
    `
    UPDATE smartcity."user" SET email = $1, password = $2, firstname = $3,
                            lastname = $4, phone = $5, is_admin = $6,
                            locality = $7, postal_code = $8, street_number = $9,
                            street_name = $10, country = $11, picture = $12 
                            WHERE user_id = $13;`,
    [
      user.email,
      user.password,
      user.firstname,
      user.lastname,
      user.phone,
      user.isAdmin,
      user.locality,
      user.postalCode,
      user.streetNumber,
      user.streetName,
      user.country,
      user.picture,
      userID,
    ]
  );

  if (user.customer != null) {
    await client.query(
      `UPDATE smartcity."customer" SET commune = $1, search_walker = $2,
                                                         search_host = $3
                                                         WHERE user_id = $4;`,
      [
        user.customer.commune,
        user.customer.searchWalker,
        user.customer.searchHost,
        userID,
      ]
    );
  }

  if (user.supplier != null) {
    await client.query(
      `UPDATE smartcity."supplier" SET is_host = $1, is_animal_walker = $2,
                                                        slogan = $3, commune = $4, weight_max = $5 
                                                        WHERE user_id = $6;`,
      [
        user.supplier.isHost,
        user.supplier.isAnimalWalker,
        user.supplier.slogan,
        user.supplier.commune,
        user.supplier.weightMax,
        userID,
      ]
    );
  }

  return;
};

module.exports.deleteUser = async (client, userId) => {
  const {rowCount} = await client.query(`
  DELETE FROM smartcity."user"
  WHERE user_id = $1`, [userId]);

  return rowCount;
};
