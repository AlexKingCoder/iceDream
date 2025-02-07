const User = require("../api/models/User.js");
const { verifyToken } = require("../utils/token.js");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json("Acceso no autorizado");
  
  try {
    const decoded = verifyToken(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json("Por favor, introduce un usuario para utilizar esta función.");
    }

    next();
  } catch (error) {
    return res.status(401).json("Acceso no autorizado");
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json("Acceso denegado: Se requiere rol de Administrador.");
  }
  next();
};

module.exports = { isAuth, isAdmin };
