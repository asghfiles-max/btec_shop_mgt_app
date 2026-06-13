const orderService = require('../services/orderService');

async function createOrder(req, res, next) {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await orderService.getOrder(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function listOrders(req, res, next) {
  try {
    const orders = await orderService.listOrders(req.query);
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, updateOrder, getOrder, listOrders };
