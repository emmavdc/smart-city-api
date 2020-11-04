const UserDAO = require('../dao/userDAO');
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.createUser = async (client, user) => {

    // crypt password
    user.password = bcrypt.hashSync(user.password, saltRounds);

    //TODO #4 business validation

    return await UserDAO.insertUser(client, user);

}


module.exports.loginUser = async (client, user) => {

    const {rows: users} = await UserDAO.selectUser(client, user);

    return bcrypt.compareSync(user.password, users[0].password);
   
}


