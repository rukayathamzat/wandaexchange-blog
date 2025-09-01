/**
 * tag controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::tag.tag', ({ strapi }) => ({
  // Get tag by slug with article count
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale = 'en' } = ctx.query;

    try {
      const tag = await strapi.db.query('api::tag.tag').findOne({
        where: { slug },
        populate: {
          articles: {
            where: {
              publishedAt: { $notNull: true }
            },
            populate: ['featuredImage']
          }
        }
      });

      if (!tag) {
        return ctx.notFound('Tag not found');
      }

      // Add article count
      const articleCount = tag.articles?.length || 0;

      return {
        ...tag,
        articleCount
      };
    } catch (error) {
      ctx.throw(500, 'Error retrieving tag');
    }
  },

  // Get all tags with article counts
  async findMany(ctx) {
    const { locale = 'en', limit = 50 } = ctx.query;

    try {
      const tags = await strapi.db.query('api::tag.tag').findMany({
        populate: {
          articles: {
            where: {
              publishedAt: { $notNull: true }
            }
          }
        },
        orderBy: 'name:asc',
        limit: Number(limit)
      });

      // Add article count for each tag
      const tagsWithCounts = tags.map(tag => ({
        ...tag,
        articleCount: tag.articles?.length || 0
      }));

      return tagsWithCounts;
    } catch (error) {
      ctx.throw(500, 'Error retrieving tags');
    }
  },

  // Get popular tags (tags with most articles)
  async findPopular(ctx) {
    const { locale = 'en', limit = 10 } = ctx.query;

    try {
      const tags = await strapi.db.query('api::tag.tag').findMany({
        populate: {
          articles: {
            where: {
              publishedAt: { $notNull: true }
            }
          }
        },
        orderBy: 'articles:desc',
        limit: Number(limit)
      });

      // Add article count and sort by popularity
      const tagsWithCounts = tags
        .map(tag => ({
          ...tag,
          articleCount: tag.articles?.length || 0
        }))
        .sort((a, b) => b.articleCount - a.articleCount);

      return tagsWithCounts;
    } catch (error) {
      ctx.throw(500, 'Error retrieving popular tags');
    }
  }
}));
