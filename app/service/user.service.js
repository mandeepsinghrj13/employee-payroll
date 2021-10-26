const { create, login, getAllUsers, getUserByUserId, updateUser, deleteUser } = require("../models/user.models");
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
  getEmail: (body, callBack) => {
    login(body, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  },
  getUsers: (body, callBack) => {
    getAllUsers(body, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  },
  getUserByUserId: (id, callBack) => {
    getUserByUserId(id, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  },
  updateUser: (body, callback) => {
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  },
  deleteUser: (data, callBack) => {
    deleteUser(data, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  },
};
