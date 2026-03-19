const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.Hello);
    req.user = decoded;
    req.userId = decoded.id;
      req.role = decoded.role;
    next();
  } catch (err){
    console.log(err);
    
    return res.status(401).json({err, message: "Invalid token" });
  }
}

function checkAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else
    (err) => {
      console.log(err);
      res.status(403).json({ message: "Access denied. Admins only." });
    };
}

module.exports = { authMiddleware, checkAdmin };
