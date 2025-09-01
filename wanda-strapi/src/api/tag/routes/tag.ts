/**
 * tag router
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    // Get all tags with article counts
    {
      method: 'GET',
      path: '/tags',
      handler: 'tag.findMany',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Get tag by slug
    {
      method: 'GET',
      path: '/tags/slug/:slug',
      handler: 'tag.findBySlug',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Get popular tags
    {
      method: 'GET',
      path: '/tags/popular',
      handler: 'tag.findPopular',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    // Standard CRUD operations
    {
      method: 'GET',
      path: '/tags/:id',
      handler: 'tag.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/tags',
      handler: 'tag.create',
      config: {
        auth: { scope: ['admin', 'editor'] },
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/tags/:id',
      handler: 'tag.update',
      config: {
        auth: { scope: ['admin', 'editor'] },
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/tags/:id',
      handler: 'tag.delete',
      config: {
        auth: { scope: ['admin'] },
        policies: [],
        middlewares: [],
      },
    },
  ],
};
