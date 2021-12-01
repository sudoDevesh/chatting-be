import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json("Authentication Details Required");
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "thisistokensecret", (err, verifiedJwt) => {
    if (err) {
      res.json(err.message);
    } else {
      next();
    }
  });
};

export default verifyToken;
