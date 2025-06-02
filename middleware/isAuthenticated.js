const isAuthenticatedUser = async (req, res, next) => {
  if (req.session?.userId) {
    req.user = await User.findById(req.session.userId).select('-password');
  }
  next();
};

module.exports = isAuthenticatedUser;