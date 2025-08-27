import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::article.article', {
  config: {
    find: {
      middlewares: ['api::article.article-filters']
    }
  },
  only: ['find', 'findOne'],
  except: []
});

// Custom routes need to be defined separately
export const customRoutes = [
  {
    method: 'GET',
    path: '/articles/slug/:slug',
    handler: 'article.findBySlug',
    config: {
      policies: [],
      middlewares: []
    }
  },
  {
    method: 'GET',
    path: '/articles/filtered',
    handler: 'article.findWithFilters',
    config: {
      policies: [],
      middlewares: []
    }
  }
];
