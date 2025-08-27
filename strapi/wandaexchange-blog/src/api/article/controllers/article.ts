import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale } = ctx.query;

    const entity = await strapi.db.query('api::article.article').findOne({
      where: { slug },
      populate: ['featuredImage', 'tags'],
      ...(locale && { locale })
    });

    if (!entity) {
      return ctx.notFound('Article not found');
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async findWithFilters(ctx) {
    const { page = 1, limit = 10, tags, locale, sort = 'publicationDate:desc' } = ctx.query;

    const filters = {
      ...(tags && { tags: { slug: { $in: Array.isArray(tags) ? tags : [tags] } } })
    };

    const { results, pagination } = await strapi.service('api::article.article').find({
      filters,
      populate: ['featuredImage', 'tags'],
      pagination: { page, pageSize: limit },
      sort,
      ...(locale && { locale })
    });

    const sanitizedResults = await this.sanitizeOutput(results, ctx);
    return this.transformResponse(sanitizedResults, { pagination });
  }
}));
