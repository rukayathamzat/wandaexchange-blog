/**
 * article router
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    // Get all articles with enhanced filtering and pagination
    {
      method: 'GET',
      path: '/articles',
      handler: 'article.findMany',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Get article by slug
    {
      method: 'GET',
      path: '/articles/slug/:slug',
      handler: 'article.findBySlug',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Get featured articles
    {
      method: 'GET',
      path: '/articles/featured',
      handler: 'article.findFeatured',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Get articles by tag
    {
      method: 'GET',
      path: '/articles/tag/:tagSlug',
      handler: 'article.findByTag',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Standard CRUD operations
    {
      method: 'GET',
      path: '/articles/:id',
      handler: 'article.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/articles',
      handler: 'article.create',
      config: {
        auth: { scope: ['admin', 'editor'] },
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/articles/:id',
      handler: 'article.update',
      config: {
        auth: { scope: ['admin', 'editor'] },
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/articles/:id',
      handler: 'article.delete',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
      },
    },
  ],
};
