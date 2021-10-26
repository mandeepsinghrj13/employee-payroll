const { createUser, getEmail, getUsers, getUserByUserId, updateUser, deleteUser } = require("../service/user.service");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  /**
   * create user for emp-payroll
   * @param {*} req
   * @param {*} res
   */
  createUser: (req, res) => {
    const body = req.body;
    createUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * login using email and password
   * @param {*} req
   * @param {*} res
   */
  login: (req, res) => {
    const body = req.body;
    getEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "2h",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },
  /**
   * getAllUser from database
   * @param {*} req
   * @param {*} res
   */
  getAllUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * get data using Id
   * @param {*} req
   * @param {*} res
   */
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  /**
   * updateUser using id
   * @param {*} req
   * @param {*} res
   */
  updateUsers: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "You Passing Duplicate Email",
        });
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  /**
   * deleteUser by id
   * @param {*} req
   * @param {*} res
   */
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.affectedRows == 0) {
        return res.json({
          success: 0,
          message: "Id Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
