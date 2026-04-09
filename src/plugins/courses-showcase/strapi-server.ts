export default {
  register({ strapi }: { strapi: any }) {},
  bootstrap({ strapi }: { strapi: any }) {},
  contentTypes: {
    course: {
      schema: require('./server/content-types/course/schema.json'),
    },
  },
  controllers: {},
  routes: {},
};