import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::article.article', ({ strapi }) => ({
  async findBySlug(slug: string, locale?: string) {
    return await strapi.db.query('api::article.article').findOne({
      where: { slug },
      populate: ['featuredImage', 'tags'],
      ...(locale && { locale })
    });
  },

  async findWithFilters(filters: any, locale?: string) {
    return await strapi.db.query('api::article.article').findMany({
      where: filters,
      populate: ['featuredImage', 'tags'],
      ...(locale && { locale })
    });
  },

  async getPublishedArticles(locale?: string) {
    return await strapi.db.query('api::article.article').findMany({
      where: { publishedAt: { $notNull: true } },
      populate: ['featuredImage', 'tags'],
      ...(locale && { locale })
    });
  }
}));
