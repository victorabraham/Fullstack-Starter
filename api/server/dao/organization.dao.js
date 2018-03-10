import { Organization } from '../models';

/**
 * Create new organization
 * @property {object} data - Data related to organization object.
 * @returns {Organization}
 */
const create = data => (Organization.create(data));

/**
 * Get organization details
 * @property {string} orgId - Unique id of the organization.
 * @returns {Organization}
 */
const read = orgId => (
  Organization.findOne({
    where: {
      id: orgId
    }
  })
);


/**
 * update organization details
 * @property {string} orgId - The id of organization.
 * @property {object} data - Data related to organization object.
 * @returns {Organization}
 */
const update = (orgId, data) => (
  Organization.update(data,
    { where: { id: orgId },
      returning: true,
      plain: true
    }
  )
);

/**
 * Delete organization record
 * @property {string} orgId - The organizationname of organization.
 * @returns {Organization}
 */
const remove = orgId => (Organization.destroy({ where: { id: orgId } }));

/**
 * Get list of organizations
 * @returns {organizations}
 */
const findAll = () => (Organization.findAll());

/**
 * Get single organization by Id
 * @property {string} orgId - The id of organization.
 * @returns {Organization}
 */
const findById = orgId => (Organization.findOne({ where: { id: orgId } }));

export default { create, read, update, remove, findAll, findById };
