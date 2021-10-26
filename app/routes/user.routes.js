const { createUser, login, getAllUsers } = require("../controller/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/register", checkToken, createUser);
router.post("/login", login);
router.get("/getall", checkToken, getAllUsers);

module.exports = router;
