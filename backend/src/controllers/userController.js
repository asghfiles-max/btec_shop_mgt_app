const userService = require('../services/userService');

async function listUsers(req, res, next) {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = { listUsers, getUser };
