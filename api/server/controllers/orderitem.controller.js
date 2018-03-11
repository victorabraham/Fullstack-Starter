import httpStatus from 'http-status';
import orderItemDao from '../dao/orderitem.dao';
import APIError from '../helpers/APIError';

/**
 * Gets order item record
 */
function get(req, res, next) {
  orderItemDao.read(req.params.orderItemId)
    .then((orderItem) => {
      if (orderItem) {
        res.json(orderItem);
      } else {
        return next(new APIError('Unable to find order item', httpStatus.NOT_FOUND, true));
      }
    });
}

/**
 * Forwards order item creation to dao class
 */
function create(req, res, next) {
  const data = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    orderId: req.params.orderId
  };
  orderItemDao.create(data)
    .then((neworderItem, created) => {
      if (!neworderItem) {
        res.send(false);
      }
      if (neworderItem) {
        res.json(neworderItem);
      }
    });
}

/**
 * Update existing order
 */
function update(req, res, next) {
  const data = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    orderId: req.params.orderId
  };
  orderItemDao.update(req.params.orderItemId, data)
    .then((saveResult) => {
      if (saveResult && saveResult.length && saveResult.length >= 2) {
        if (saveResult[1] === 1) {
          res.json(saveResult);
        } else if (saveResult[1] === 0) {
          return next(new APIError('Cannot find order item', httpStatus.NOT_FOUND, true));
        }
      } else {
        return next(new APIError('Error while updating order item', httpStatus.NOT_FOUND, true));
      }
    });
}

/**
 * Get order item list.
 */
function findAll(req, res, next) {
  orderItemDao.findAll(req.params.orderItemId)
    .then((orders) => {
      res.json(orders);
    });
}

/**
 * Delete order item
 */
function remove(req, res, next) {
  orderItemDao.remove(req.params.orderItemId)
    .then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        res.status(httpStatus.NO_CONTENT).send();
      } else {
        return next(new APIError('Error while deleting order item', httpStatus.NOT_FOUND, true));
      }
    });
}

export default { get, create, update, findAll, remove };
