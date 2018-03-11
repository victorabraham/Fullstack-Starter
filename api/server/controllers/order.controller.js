import httpStatus from 'http-status';
import orderDao from '../dao/order.dao';
import orderItemDao from '../dao/orderitem.dao';
import APIError from '../helpers/APIError';

/**
 * Gets order record
 */
function get(req, res, next) {
  orderDao.read(req.params.orderId)
    .then((order) => {
      if (order) {
        res.json(order);
      } else {
        return next(new APIError('Unable to find order', httpStatus.NOT_FOUND, true));
      }
    });
}

/**
 * Forwards order creation to dao class
 */
function create(req, res, next) {
  const data = {
    userId: req.body.userId,
    status: req.body.status,
  };
  orderDao.create(data)
    .then((neworder, created) => {
      if (!neworder) {
        res.send(false);
      }
      if (neworder) {
        res.json(neworder);
      }
    });
}

/**
 * Update existing order
 */
function update(req, res, next) {
  const data = {
    userId: req.body.userId,
    status: req.body.status,
  };
  orderDao.update(req.params.orderId, data)
    .then((saveResult) => {
      if (saveResult && saveResult.length && saveResult.length >= 2) {
        if (saveResult[1] === 1) {
          res.json(saveResult);
        } else if (saveResult[1] === 0) {
          return next(new APIError('Cannot find order', httpStatus.NOT_FOUND, true));
        }
      } else {
        return next(new APIError('Error while updating order', httpStatus.NOT_FOUND, true));
      }
    });
}

/**
 * Get order list.
 */
function findAll(req, res, next) {
  orderDao.findAll(req.params.orderId)
    .then((orders) => {
      res.json(orders);
    });
}

/**
 * Delete order
 */
function remove(req, res, next) {
  orderDao.remove(req.params.orderId)
    .then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        res.status(httpStatus.NO_CONTENT).send();
      } else {
        return next(new APIError('Error while deleting order', httpStatus.NOT_FOUND, true));
      }
    });
}

export default { get, create, update, findAll, remove };
