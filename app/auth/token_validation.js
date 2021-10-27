const { verify } = require("jsonwebtoken");
module.exports = {
  /**
   * checkToken verify
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.TOCKEN, (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token...",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User",
      });
    }
  },
};
