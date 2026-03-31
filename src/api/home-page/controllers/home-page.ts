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
            'section.cta': {
              populate: '*',
            },
            'section.course-categories': {
              populate: {
                CategoryCard: {
                  populate: {
                    icon: true,
                  },
                },
              },
            },
            'section.testimonials': {
              populate: {
                TestimonialsCard: {
                  populate: {
                    avatar: true,
                  },
                },
              },
            },
            'section.why-choose-us': {
              populate: {
                featurecard: {
                  populate: {
                    icon: true,
                  },
                },
              },
            },
            'section.top-courses': {
              populate: {
                coursecard: {
                  populate: {
                    thumbnail: true,
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