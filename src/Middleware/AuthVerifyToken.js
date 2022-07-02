var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let Token = req.headers["token-key"];
  jwt.verify(Token, "key", (error, decode) => {
    if (error) {
      res.status(401).json({ status: "Fail", data: error });
    } else {
      // Get User name from decoded token. And add to header
      let userName = decode.data.UserName; //admin
      req.headers.username = userName;
      next();
    }
  });
};
