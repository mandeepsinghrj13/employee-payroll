const {
  createUser,
  login,
  getAllUsers,
  getUserByUserId,
  updateUsers,
  deleteUser,
  createEmployee,
} = require("../controller/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

//post method using for register
router.post("/register", checkToken, createUser);
//post method using for login
router.post("/login", login);
//post method using for createEmployee
router.post("/cteateEmployee", checkToken, createEmployee);
//get method using for getall data
router.get("/getall", checkToken, getAllUsers);
//get method using for getbyid
router.get("/getbyid/:id", checkToken, getUserByUserId);
//put method using for update
router.put("/update", checkToken, updateUsers);
//delete method using for delete
router.delete("/delete", checkToken, deleteUser);
module.exports = router;
