import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::tag.tag', {
  only: ['find', 'findOne'],
  except: []
});

// Custom routes need to be defined separately
export const customRoutes = [
  {
    method: 'GET',
    path: '/tags/slug/:slug',
    handler: 'tag.findBySlug',
    config: {
      policies: [],
      middlewares: []
    }
  }
];
