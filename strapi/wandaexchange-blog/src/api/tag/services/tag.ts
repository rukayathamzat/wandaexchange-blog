import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::tag.tag', ({ strapi }) => ({
  async findBySlug(slug: string, locale?: string) {
    return await strapi.db.query('api::tag.tag').findOne({
      where: { slug },
      populate: ['articles'],
      ...(locale && { locale })
    });
  },

  async getAllTags(locale?: string) {
    return await strapi.db.query('api::tag.tag').findMany({
      populate: ['articles'],
      ...(locale && { locale })
    });
  }
}));
