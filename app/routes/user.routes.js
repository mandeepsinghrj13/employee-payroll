const { createUser, login, getAllUsers, getUserByUserId, updateUsers } = require("../controller/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/register", checkToken, createUser);
router.post("/login", login);
router.get("/getall", checkToken, getAllUsers);
router.get("/getbyid/:id", checkToken, getUserByUserId);
router.put("/update", checkToken, updateUsers);
module.exports = router;
