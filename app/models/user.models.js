const pool = require("../../config/database");
module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into payrolltable(email, password) values(?,?)`,
      [data.email, data.password],
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
  login: (email, callBack) => {
    pool.query(`select * from payrolltable where email = ?`, [email], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
