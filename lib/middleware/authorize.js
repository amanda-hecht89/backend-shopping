const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const items = await Item.getById(req.params.id); 
    if (items.user_id !== req.user.id)
      throw new Error('Not for You');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
