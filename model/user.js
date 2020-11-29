const UserDAO = require("../dao/userDAO");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports.createUser = async (client, user) => {
  // crypt password
  user.password = bcrypt.hashSync(user.password, saltRounds);

  //TODO #4 business validation

  const userId = await UserDAO.insertUser(client, user);
  return jwt.sign(
    {
      email: user.email,
      userId: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.SECRET
  );
};

module.exports.loginUser = async (client, user) => {
  const { rows: users } = await UserDAO.selectUser(client, user);

  if (users[0]) {
    if (bcrypt.compareSync(user.password, users[0].password)) {
      return jwt.sign(
        {
          email: user.email,
          userId: user.userId,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        process.env.SECRET
      );
    }
  }
  return;
};

module.exports.updateUser = async (client, user, userId) => {
  user.password = bcrypt.hashSync(user.password, saltRounds);

  //todo #8 business check (email exists + return errors)

  return await UserDAO.updateUser(client, user, userId);
};
