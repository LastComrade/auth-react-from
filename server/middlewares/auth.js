const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authMid = {
  checkUser: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const token = bearerHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid token. Please login again" });
        } else if (authData) {
          req.userId = authData.id;
          next();
        }
      });
    }
  },
};

module.exports = authMid;
