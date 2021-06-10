const jwt = require("jsonwebtoken");
const get_cookies = require("../helpers/get_cookies");
const User = require("../models/users");

function AuthenticatedAdmin(icomponent) {
  return async (req, res) => {
    try {
      const authorization = get_cookies(req).token;
      if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
      }
      const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
      const user = await User.findById(_id);
      if (user.role !== "admin" || !user) {
        return res.status(403).send();
      }
      req.userId = _id;
      return icomponent(req, res);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "You must be logged in" });
    }
  };
}

module.exports = AuthenticatedAdmin;
