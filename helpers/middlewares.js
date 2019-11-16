const createError = require('http-errors');
exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};
exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};
exports.validationLoggin = () => (req, res, next) => {
  const { mail, password } = req.body;
  if (!mail || !password) next(createError(400));
  else next();
}