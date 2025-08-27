export default (config, { strapi }) => {
  return async (ctx, next) => {
    // Set default pagination
    if (!ctx.query.pagination) {
      ctx.query.pagination = { page: 1, pageSize: 10 };
    }

    // Set default sort by publication date descending
    if (!ctx.query.sort) {
      ctx.query.sort = { publicationDate: 'desc' };
    }

    // Always populate featured image and tags
    if (!ctx.query.populate) {
      ctx.query.populate = ['featuredImage', 'tags'];
    }

    await next();
  };
};
