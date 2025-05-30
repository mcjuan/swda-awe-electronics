export function requireAdmin(req, res, next) {
  if (
    req.session &&
    req.session.user &&
    req.session.user.role === "administrator"
  ) {
    return next();
  }
  // Always send a response if not admin!
  return res.status(403).json({ success: false, message: "Admins only." });
}
