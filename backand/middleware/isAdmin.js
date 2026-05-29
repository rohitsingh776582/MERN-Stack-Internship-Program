
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    console.log("Only admin allowed", req.user.role);
    return res.status(403).json({ message: "Only admin allowed" });
  }
  next();
};

module.exports = isAdmin;

