const authService = require('../services/authService');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { email } = req.body;
    await authService.resetPassword(email);
    res.json({ message: 'Password reset request received. Check your email.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { login, resetPassword };
