const {
  registration,
  login,
  getAllEmployee,
  getEmployeeById,
  updateUsers,
  deleteEmployeeById,
  createEmployee,
} = require("../controller/user.controller");

const { checkToken } = require("../auth/token_validation");
module.exports = (app) => {
  //post method using for register
  app.post("/register", registration);
  //post method using for login
  app.post("/login", login);
  //post method using for createEmployee
  app.post("/createEmployee", checkToken, createEmployee);
  //get method using for getall data
  app.get("/getall", checkToken, getAllEmployee);
  //get method using for getbyid
  app.get("/getbyid/:id", checkToken, getEmployeeById);
  //put method using for update
  app.put("/update", checkToken, updateUsers);
  //delete method using for delete
  app.delete("/delete", checkToken, deleteEmployeeById);
};
