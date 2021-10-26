const { create } = require("../models/user.models");
const { genSaltSync, hashSync } = require("bcrypt");
module.exports = {
  createUser: (body, callback) => {
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },
};
