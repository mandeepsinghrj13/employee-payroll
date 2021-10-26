const { create, login, getAllUsers, getUserByUserId, updateUser, deleteUser } = require("../models/user.models");
const { genSaltSync, hashSync } = require("bcrypt");
module.exports = {
  /**
   * createUser and change plantext to hash password
   * @param {*} body
   * @param {*} callback
   */
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
  /**
   * login
   * @param {*} body
   * @param {*} callBack
   */
  getEmail: (body, callBack) => {
    login(body, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  },
  /**
   * getAllUsers
   * @param {*} body
   * @param {*} callBack
   */
  getUsers: (body, callBack) => {
    getAllUsers(body, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  },
  /**
   * getUserByUserId
   * @param {*} id
   * @param {*} callBack
   */
  getUserByUserId: (id, callBack) => {
    getUserByUserId(id, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  },
  /**
   * updateUser
   * @param {*} body
   * @param {*} callback
   */
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
  /**
   * deleteUser by id
   * @param {*} data
   * @param {*} callBack
   */
  deleteUser: (data, callBack) => {
    deleteUser(data, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  },
};
