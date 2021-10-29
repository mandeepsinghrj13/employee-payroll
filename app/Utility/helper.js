const jwt = require("jsonwebtoken");
module.exports = {
  jwtTokenGenerate: (data, sec) => {
    const dataForToken = {
      email: data.email,
      id: data.id,
    };
    return jwt.sign(dataForToken, sec, { expiresIn: "48h" });
  },
  verifyToken: (req, res, next) => {
    try {
      const header = req.headers.authorization;
      const myArr = header.split(" ");
      const token = myArr[1];
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (decode) {
        console.log("token verified");
        req.userData = decode;
        next();
      } else {
        console.log("token verify error");
      }
    } catch (error) {
      res.status(401).send({
        error: "Your token has expiered",
      });
    }
  },
};
