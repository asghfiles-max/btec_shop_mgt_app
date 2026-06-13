const customerService = require('../services/customerService');

async function createCustomer(req, res, next) {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
}

async function updateCustomer(req, res, next) {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function deleteCustomer(req, res, next) {
  try {
    await customerService.deleteCustomer(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

async function listCustomers(req, res, next) {
  try {
    const customers = await customerService.listCustomers(req.query);
    res.json(customers);
  } catch (error) {
    next(error);
  }
}

async function customerHistory(req, res, next) {
  try {
    const history = await customerService.getCustomerHistory(req.params.id);
    res.json(history);
  } catch (error) {
    next(error);
  }
}

module.exports = { createCustomer, updateCustomer, deleteCustomer, listCustomers, customerHistory };
