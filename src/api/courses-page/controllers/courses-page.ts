import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::courses-page.courses-page', ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.entityService.findOne('api::courses-page.courses-page', 1, {
      populate: {
        heroimage: true,
        larningpath: {
          populate: {
            routepath: true,
          },
        },
      },
    });

    return { data: entity };
  },
}));