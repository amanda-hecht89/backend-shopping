const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

// TO DO - implement items CRUD
module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Item.getAll(req.user.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

