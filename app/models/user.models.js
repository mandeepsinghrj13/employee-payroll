const pool = require("../../config/database");
module.exports = {
  /**
   * createing data using insert command
   * @param {*} data
   * @param {*} callBack
   */
  registration: (data, callBack) => {
    pool.query(
      `insert into payrolltable(email, password, firstName, lastName, designation, joningdate) values(?,?,?,?,?,?)`,
      [data.email, data.password, data.firstName, data.lastName, data.designation, data.joningdate],
      (error, results, fields) => {
        if (error) {
          if (error.code === "ER_DUP_ENTRY") {
            let err = "user already there";
            return callBack(err, null);
          } else {
            return callBack(error, null);
          }
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  /**
   * login check email
   * @param {*} email
   * @param {*} callBack
   */
  login: (email, callBack) => {
    pool.query(`select * from payrolltable where email = ?`, [email], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
  createEmployee: (data, callBack) => {
    pool.query(
      `insert into payrolltable(email, password,firstName,lastName,designation,joningdate) values(?,?,?,?,?,?)`,
      [data.email, data.password, data.firstName, data.lastName, data.designation, data.joningdate],
      (error, results, fields) => {
        if (error) {
          if (error.code === "ER_DUP_ENTRY") {
            let err = "user already there";
            return callBack(err, null);
          } else {
            return callBack(error, null);
          }
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  /**
   * getAllUsers
   * @param {*} callBack
   */
  getAllEmployee: (callBack) => {
    pool.query(`select id,email,firstName,lastName,designation,joningdate from payrolltable`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
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
    pool.query(
      `select id,email,firstName,lastName,designation,joningdate from payrolltable where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  /**
   * updateUser using id
   * @param {*} data
   * @param {*} callBack
   */
  updateUser: (data, callBack) => {
    pool.query(
      `update payrolltable set email=?, password=?, firstName=?, lastName=?, designation=?, joningdate=? where id = ?`,
      [data.email, data.password, data.firstName, data.lastName, data.designation, data.joningdate, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  /**
   * deleteUser by id
   * @param {*} data
   * @param {*} callBack
   */
  deleteEmployeeById: (data, callBack) => {
    pool.query(`delete from payrolltable where id = ?`, [data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },
};
