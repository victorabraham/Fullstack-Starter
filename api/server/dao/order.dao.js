import { Order, OrderItem } from '../models';

/**
 * Create new Order
 * @property {object} data - Data related to Order object.
 * @returns {Order}
 */
const create = data => (Order.create(data));

/**
 * Get Order details
 * @property {string} orderId - Unique id of the Order.
 * @returns {Order}
 */
const read = orderId => (
  Order.findOne({
    where: {
      id: orderId
    }
  })
);


/**
 * update Order details
 * @property {string} orderId - The id of Order.
 * @property {object} data - Data related to Order object.
 * @returns {Order}
 */
const update = (orderId, data) => (
  Order.update(data,
    { where: { id: orderId },
      returning: true,
      plain: true
    }
  )
);

/**
 * Delete Order record
 * @property {string} orderId - The Ordername of Order.
 * @returns {Order}
 */
const remove = orderId => (Order.destroy({ where: { id: orderId } }));

/**
 * Get list of Orders
 * @returns {Orders}
 */
const findAll = () => (Order.findAll({
  include: [{
    model: OrderItem,
    as: 'orderItems',
  }],
}));

/**
 * Get single Order by Id
 * @property {string} orderId - The id of Order.
 * @returns {Order}
 */
const findById = orderId => (Order.findOne({ where: { id: orderId } }));


export default { create, read, update, remove, findAll, findById };
