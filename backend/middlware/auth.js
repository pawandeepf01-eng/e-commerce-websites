const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
const token = req.headers.authorization?.split(" ")[1];  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.Hello);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function checkAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next(); 
  } else {
    // console.log(err);
    res.status(403).json({ message: "Access denied. Admins only." });
  }
}

module.exports = { authMiddleware, checkAdmin };
