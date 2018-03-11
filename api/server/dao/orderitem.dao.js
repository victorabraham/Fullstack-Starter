import { OrderItem } from '../models';

/**
 * Create new OrderItem
 * @property {object} data - Data related to OrderItem object.
 * @returns {OrderItem}
 */
const create = data => (OrderItem.create(data));

/**
 * Get OrderItem details
 * @property {string} orderItemId - Unique id of the OrderItem.
 * @returns {OrderItem}
 */
const read = orderItemId => (
  OrderItem.findOne({
    where: {
      id: orderItemId
    }
  })
);


/**
 * update OrderItem details
 * @property {string} orderItemId - The id of OrderItem.
 * @property {object} data - Data related to OrderItem object.
 * @returns {OrderItem}
 */
const update = (orderItemId, data) => (
  OrderItem.update(data,
    { where: { id: orderItemId },
      returning: true,
      plain: true
    }
  )
);

/**
 * Delete OrderItem record
 * @property {string} orderItemId - The OrderItemname of OrderItem.
 * @returns {OrderItem}
 */
const remove = orderItemId => (OrderItem.destroy({ where: { id: orderItemId } }));

/**
 * Get list of OrderItems
 * @returns {OrderItems}
 */
const findAll = () => (OrderItem.findAll());

/**
 * Get single OrderItem by Id
 * @property {string} orderItemId - The id of OrderItem.
 * @returns {OrderItem}
 */
const findById = orderItemId => (OrderItem.findOne({ where: { id: orderItemId } }));


export default { create, read, update, remove, findAll, findById };
