import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
  async find(ctx) {
    const data = await strapi.documents('api::home-page.home-page').findFirst({
      populate: {
        sections: {
          on: {
            'section.hero-slider': {
              populate: {
                slider: {
                  populate: {
                    image: true,
                    stats: true,
                  },
                },
              },
            },
            'section.course-highlight': {
              populate: {
                image: true,
                feature: {
                  populate: {
                    icon: true,
                  },
                },
              },
            },
          },
        },
      } as any,
    });

    return { data };
  },
}));