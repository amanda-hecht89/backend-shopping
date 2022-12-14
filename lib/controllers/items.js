const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');
const authorize = require('../middleware/authorize');
// const UserService = require('../services/UserService');
// const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

// TO DO - implement items CRUD
module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Item.getAll(req.user.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const data = await Item.insert({ description: req.body.description, qty: req.body.qty, user_id: req.user.id });
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const data = await Item.updateById(req.user.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const data = await Item.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
