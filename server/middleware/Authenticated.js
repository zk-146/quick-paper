const jwt = require("jsonwebtoken");
const get_cookies = require("../helpers/get_cookies");

function Authenticated(icomponent) {
  return (req, res) => {
    const authorization = get_cookies(req).token;
    if (!authorization) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    try {
      const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
      req.userId = _id;
      return icomponent(req, res);
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "You must be logged in" });
    }
  };
}
module.exports = Authenticated;
