const {
  registration,
  login,
  getAllEmployee,
  getEmployeeById,
  updateUser,
  deleteEmployeeById,
  createEmployee,
} = require("../models/user.models");
const { genSaltSync, hashSync } = require("bcrypt");
module.exports = {
  /**
   * createUser and change plantext to hash password
   * @param {*} body
   * @param {*} callback
   */
  registration: (body, callback) => {
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    registration(body, (err, results) => {
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
  createEmployee: (body, callback) => {
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createEmployee(body, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },
  /**
   * getAllUsers
   * @param {*} body
   * @param {*} callBack
   */
  getAllEmployee: (body, callBack) => {
    getAllEmployee(body, (err, results) => {
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
  getEmployeeById: (id, callBack) => {
    getEmployeeById(id, (err, results) => {
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
  deleteEmployeeById: (data, callBack) => {
    deleteEmployeeById(data, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  },
};
