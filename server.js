require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./app/routes/user.routes");

app.use(express.json());

app.use("/", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "welcome to emp-payroll",
  });
});
app.listen(process.env.APP_PORT, () => {
  console.log("server up and runing on port : ", process.env.APP_PORT);
});
