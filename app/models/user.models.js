const pool = require("../../config/database");
module.exports = {
  /**
   * createing data using insert command
   * @param {*} data
   * @param {*} callBack
   */
  create: (data, callBack) => {
    pool.query(`insert into payrolltable(email, password) values(?,?)`, [data.email, data.password], (error, results, fields) => {
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
    });
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
  /**
   * getAllUsers
   * @param {*} callBack
   */
  getAllUsers: (callBack) => {
    pool.query(`select id,email from payrolltable`, [], (error, results, fields) => {
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
  getUserByUserId: (id, callBack) => {
    pool.query(`select id,email from payrolltable where id = ?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
  /**
   * updateUser using id
   * @param {*} data
   * @param {*} callBack
   */
  updateUser: (data, callBack) => {
    pool.query(
      `update payrolltable set email=?, password=? where id = ?`,
      [data.email, data.password, data.id],
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
  deleteUser: (data, callBack) => {
    pool.query(`delete from payrolltable where id = ?`, [data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },
};
