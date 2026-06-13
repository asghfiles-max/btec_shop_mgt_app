const inventoryService = require('../services/inventoryService');

async function listInventory(req, res, next) {
  try {
    const items = await inventoryService.listInventory(req.query);
    res.json(items);
  } catch (error) {
    next(error);
  }
}

async function createItem(req, res, next) {
  try {
    const item = await inventoryService.createInventoryItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

async function updateStock(req, res, next) {
  try {
    const item = await inventoryService.updateStock(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

module.exports = { listInventory, createItem, updateStock };
