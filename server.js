require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "welcome to emp-payroll",
  });
});

require("./app/routes/user.routes")(app);

app.listen(process.env.APP_PORT, () => {
  console.log("server up and runing on port : ", process.env.APP_PORT);
});
module.exports = app;
