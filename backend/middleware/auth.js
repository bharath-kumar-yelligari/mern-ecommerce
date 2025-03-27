import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    // Remove "Bearer " from token string
    // const jwtToken = token.split(" ")[1];
    const jwtToken = token;

    // Verify token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    // res.json({ isAuthenticated: true, user: decoded });
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};



export const verifyToken = (req, res, next) => {
  //const token = req.header("Authorization");
  const token = req.cookies.token;
  console.log("req.cookies.token", req.cookies.token)

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const jwtToken = token;

    // Verify token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    res.json({ isAuthenticated: true, user: decoded });
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
