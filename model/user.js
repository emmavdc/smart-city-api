const UserDAO = require('../dao/userDAO');

module.exports.createUser = async (client, user) => {


    //TODO #4 business validation
    
    return await UserDAO.insertUser(client, user);
}