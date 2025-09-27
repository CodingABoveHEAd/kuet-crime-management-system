// controllers/userController.js
export const getUserProfile = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};
