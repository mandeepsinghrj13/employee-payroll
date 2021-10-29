const {
  registration,
  getEmail,
  getAllEmployee,
  getEmployeeById,
  updateUser,
  deleteEmployeeById,
  createEmployee,
} = require("../service/user.service");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  /**
   * create user for emp-payroll
   * @param {*} req
   * @param {*} res
   */
  registration: (req, res) => {
    const body = req.body;
    registration(body, (err, results) => {
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
        const jsontoken = sign({ result: results }, process.env.SECRET_KEY, {
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
  createEmployee: (req, res) => {
    const body = req.body;
    createEmployee(body, (err, results) => {
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
   * getAllUser from database
   * @param {*} req
   * @param {*} res
   */
  getAllEmployee: (req, res) => {
    getAllEmployee((err, results) => {
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
  getEmployeeById: (req, res) => {
    const id = req.params.id;
    getEmployeeById(id, (err, results) => {
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
  deleteEmployeeById: (req, res) => {
    const data = req.body;
    deleteEmployeeById(data, (err, results) => {
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
        message: "Employee deleted successfully",
        results: results,
      });
    });
  },
};
