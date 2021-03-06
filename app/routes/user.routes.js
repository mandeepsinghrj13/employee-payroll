const {
  registration,
  login,
  getAllEmployee,
  getEmployeeById,
  updateUsers,
  deleteEmployeeById,
  createEmployee,
} = require("../controller/user.controller");

const helper = require("../Utility/helper.js");
module.exports = (app) => {
  //post method using for register
  app.post("/register", registration);
  //post method using for login
  app.post("/login", login);
  //post method using for createEmployee
  app.post("/createEmployee", helper.verifyToken, createEmployee);
  //get method using for getall data
  app.get("/getall", helper.verifyToken, getAllEmployee);
  //get method using for getbyid
  app.get("/getbyid/:id", helper.verifyToken, getEmployeeById);
  //put method using for update
  app.put("/update", helper.verifyToken, updateUsers);
  //delete method using for delete
  app.delete("/delete", helper.verifyToken, deleteEmployeeById);
};
