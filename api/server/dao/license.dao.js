import { License } from '../models';

/**
 * Create new license
 * @property {object} data - Data related to license object.
 * @returns {License}
 */
const create = data => (License.create(data));

/**
 * Get license details
 * @property {string} licenseId - Unique id of the license.
 * @returns {License}
 */
const read = licenseId => (
  License.findOne({
    where: {
      id: licenseId
    }
  })
);


/**
 * update license details
 * @property {string} licenseId - The id of license.
 * @property {object} data - Data related to license object.
 * @returns {License}
 */
const update = (licenseId, data) => (
  License.update(data,
    { where: { id: licenseId },
      returning: true,
      plain: true
    }
  )
);

/**
 * Delete license record
 * @property {string} licenseId - The licensename of license.
 * @returns {License}
 */
const remove = licenseId => (License.destroy({ where: { id: licenseId } }));

/**
 * Get list of licenses
 * @returns {licenses}
 */
const findAll = () => (License.findAll());

/**
 * Get single license by Id
 * @property {string} licenseId - The id of license.
 * @returns {License}
 */
const findById = licenseId => (License.findOne({ where: { id: licenseId } }));


export default { create, read, update, remove, findAll, findById };
