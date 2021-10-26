const { createUser, login, getAllUsers, getUserByUserId } = require("../controller/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/register", checkToken, createUser);
router.post("/login", login);
router.get("/getall", checkToken, getAllUsers);
router.get("/getbyid/:id", checkToken, getUserByUserId);
module.exports = router;
