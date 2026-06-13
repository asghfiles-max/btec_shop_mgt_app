const paymentService = require('../services/paymentService');

async function listPayments(req, res, next) {
  try {
    const payments = await paymentService.listPayments(req.query);
    res.json(payments);
  } catch (error) {
    next(error);
  }
}

async function getPayment(req, res, next) {
  try {
    const payment = await paymentService.getPayment(req.params.id);
    res.json(payment);
  } catch (error) {
    next(error);
  }
}

async function createPayment(req, res, next) {
  try {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
}

async function updatePayment(req, res, next) {
  try {
    const payment = await paymentService.updatePayment(req.params.id, req.body);
    res.json(payment);
  } catch (error) {
    next(error);
  }
}

module.exports = { listPayments, getPayment, createPayment, updatePayment };
