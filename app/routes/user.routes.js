const { createUser, login, getAllUsers, getUserByUserId, updateUsers, deleteUser } = require("../controller/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/register", checkToken, createUser);
router.post("/login", login);
router.get("/getall", checkToken, getAllUsers);
router.get("/getbyid/:id", checkToken, getUserByUserId);
router.put("/update", checkToken, updateUsers);
router.delete("/delete", checkToken, deleteUser);
module.exports = router;
