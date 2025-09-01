/**
 * article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  // Get article by slug with locale support
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale = 'en' } = ctx.query;

    try {
      const article = await strapi.db.query('api::article.article').findOne({
        where: { slug },
        populate: {
          featuredImage: true,
          tags: {
            populate: ['name', 'slug', 'description']
          },
          seo: true
        }
      });

      if (!article) {
        return ctx.notFound('Article not found');
      }

      return article;
    } catch (error) {
      ctx.throw(500, 'Error retrieving article');
    }
  },

  // Get articles with enhanced filtering and pagination
  async findMany(ctx) {
    const { 
      page = 1, 
      limit = 10, 
      locale = 'en',
      tags,
      search,
      sort = 'publicationDate:desc'
    } = ctx.query;

    try {
      // Build filters
      const filters: any = {
        publishedAt: { $notNull: true }
      };

      // Add tag filtering
      if (tags) {
        filters.tags = {
          slug: { $in: Array.isArray(tags) ? tags : [tags] }
        };
      }

      // Add search functionality
      if (search) {
        filters.$or = [
          { title: { $containsi: search } },
          { shortDescription: { $containsi: search } },
          { content: { $containsi: search } }
        ];
      }

      // Calculate pagination
      const pageNum = Number(page);
      const limitNum = Number(limit);
      const start = (pageNum - 1) * limitNum;
      const end = start + limitNum;

      // Get articles with pagination
      const articles = await strapi.db.query('api::article.article').findMany({
        where: filters,
        populate: {
          featuredImage: true,
          tags: {
            populate: ['name', 'slug']
          }
        },
        orderBy: sort,
        limit: end,
        offset: start
      });

      // Get total count for pagination metadata
      const total = await strapi.db.query('api::article.article').count({
        where: filters
      });

      // Calculate pagination info
      const pageCount = Math.ceil(total / limitNum);
      const hasNextPage = pageNum < pageCount;
      const hasPrevPage = pageNum > 1;

      return {
        data: articles,
        meta: {
          pagination: {
            page: pageNum,
            limit: limitNum,
            pageCount,
            total,
            hasNextPage,
            hasPrevPage
          }
        }
      };
    } catch (error) {
      ctx.throw(500, 'Error retrieving articles');
    }
  },

  // Get featured articles
  async findFeatured(ctx) {
    const { locale = 'en', limit = 5 } = ctx.query;

    try {
      const articles = await strapi.db.query('api::article.article').findMany({
        where: {
          publishedAt: { $notNull: true }
        },
        populate: {
          featuredImage: true,
          tags: {
            populate: ['name', 'slug']
          }
        },
        orderBy: 'publicationDate:desc',
        limit: Number(limit)
      });

      return articles;
    } catch (error) {
      ctx.throw(500, 'Error retrieving featured articles');
    }
  },

  // Get articles by tag
  async findByTag(ctx) {
    const { tagSlug, locale = 'en', page = 1, limit = 10 } = ctx.query;

    if (!tagSlug) {
      return ctx.badRequest('Tag slug is required');
    }

    try {
      const filters: any = {
        publishedAt: { $notNull: true },
        tags: {
          slug: tagSlug
        }
      };

      const pageNum = Number(page);
      const limitNum = Number(limit);
      const start = (pageNum - 1) * limitNum;
      const end = start + limitNum;

      const articles = await strapi.db.query('api::article.article').findMany({
        where: filters,
        populate: {
          featuredImage: true,
          tags: {
            populate: ['name', 'slug']
          }
        },
        orderBy: 'publicationDate:desc',
        limit: end,
        offset: start
      });

      const total = await strapi.db.query('api::article.article').count({
        where: filters
      });

      const pageCount = Math.ceil(total / limitNum);

      return {
        data: articles,
        meta: {
          pagination: {
            page: pageNum,
            limit: limitNum,
            pageCount,
            total
          }
        }
      };
    } catch (error) {
      ctx.throw(500, 'Error retrieving articles by tag');
    }
  }
}));
