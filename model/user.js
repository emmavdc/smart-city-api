const UserDAO = require("../dao/userDAO");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const e = require("express");

module.exports.createUser = async (client, user) => {
  // crypt password
  user.password = bcrypt.hashSync(user.password, saltRounds);

  //TODO #4 business validation

  // if user already exist
  const { rows: users } = await UserDAO.selectUser(client, user);
  if (users[0]) {
    return null;
  }

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
      const expiresIn = users[0].is_admin ? "1d" : "1y";
      const payload = users[0].is_admin
        ? {
            value: {
              isAdmin: users[0].is_admin,
            },
          }
        : {
            value: {
              email: user.email,
              userId: users[0].user_id,
            },
          };

      return jwt.sign(payload, process.env.SECRET, {
        expiresIn: expiresIn,
      });
    }
  }
  return;
};

module.exports.updateUser = async (client, user, userId) => {
  user.password = bcrypt.hashSync(user.password, saltRounds);

  //todo #8 business check (email exists + return errors)

  return await UserDAO.updateUser(client, user, userId);
};

module.exports.getUsers = async (client, filter) => {
  const { rows: users } = await UserDAO.selectUsers(client, filter);
  return users;
};
