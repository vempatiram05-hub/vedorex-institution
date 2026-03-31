import type { Schema, Struct } from '@strapi/strapi';

export interface ElementLink extends Struct.ComponentSchema {
  collectionName: 'components_element_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface ElementLogo extends Struct.ComponentSchema {
  collectionName: 'components_element_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
  };
}

export interface FooterContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_footer_contact_infos';
  info: {
    displayName: 'contact_info';
  };
  attributes: {
    address: Schema.Attribute.String;
    Email: Schema.Attribute.Email;
    phoneNumber: Schema.Attribute.String;
  };
}

export interface FooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface FooterLinkGroup extends Struct.ComponentSchema {
  collectionName: 'components_footer_link_groups';
  info: {
    displayName: 'link-groups';
  };
  attributes: {
    label: Schema.Attribute.String;
    link_groups: Schema.Attribute.Component<'footer.link', true>;
  };
}

export interface NavLinkNavText extends Struct.ComponentSchema {
  collectionName: 'components_nav_link_nav_texts';
  info: {
    displayName: 'nav-text';
  };
  attributes: {
    isButton: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionCategoryCard extends Struct.ComponentSchema {
  collectionName: 'components_section_category_cards';
  info: {
    displayName: 'category-card';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    stat_lable_price: Schema.Attribute.String;
    stat_url: Schema.Attribute.String;
  };
}

export interface SectionCourseCard extends Struct.ComponentSchema {
  collectionName: 'components_section_course_cards';
  info: {
    displayName: 'course-card';
  };
  attributes: {
    courese_url: Schema.Attribute.String;
    course_btn: Schema.Attribute.String;
    lessons: Schema.Attribute.Integer;
    level: Schema.Attribute.Enumeration<
      ['Beginner', 'Intermediate', 'Advanced']
    >;
    name: Schema.Attribute.String;
    rating: Schema.Attribute.Integer;
    students: Schema.Attribute.Integer;
    thumbnail: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionCourseCategories extends Struct.ComponentSchema {
  collectionName: 'components_section_course_categories';
  info: {
    displayName: 'course-categories';
  };
  attributes: {
    CategoryCard: Schema.Attribute.Component<'section.category-card', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionCourseHighlight extends Struct.ComponentSchema {
  collectionName: 'components_section_course_highlights';
  info: {
    displayName: 'course-highlight';
  };
  attributes: {
    description: Schema.Attribute.String;
    feature: Schema.Attribute.Component<'section.feature', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionCta extends Struct.ComponentSchema {
  collectionName: 'components_section_ctas';
  info: {
    displayName: 'cta';
  };
  attributes: {
    Button: Schema.Attribute.String;
    ButtonUrl: Schema.Attribute.String;
    title: Schema.Attribute.Text;
  };
}

export interface SectionFeature extends Struct.ComponentSchema {
  collectionName: 'components_section_features';
  info: {
    displayName: 'feature';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
  };
}

export interface SectionFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_section_feature_cards';
  info: {
    displayName: 'feature-card';
  };
  attributes: {
    description: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link_label: Schema.Attribute.String;
    link_url: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface SectionHero extends Struct.ComponentSchema {
  collectionName: 'components_section_heroes';
  info: {
    displayName: 'slider';
  };
  attributes: {
    description: Schema.Attribute.String;
    highlighted_text: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    primary_btn_label: Schema.Attribute.String;
    primary_btn_url: Schema.Attribute.String;
    secondary_btn_label: Schema.Attribute.String;
    secondary_btn_url: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'section.stats', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionHeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_section_hero_sliders';
  info: {
    displayName: 'banner';
  };
  attributes: {
    slider: Schema.Attribute.Component<'section.hero', true>;
  };
}

export interface SectionStats extends Struct.ComponentSchema {
  collectionName: 'components_section_stats';
  info: {
    displayName: 'stats';
  };
  attributes: {
    label: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

export interface SectionTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_section_testimonials';
  info: {
    displayName: 'testimonials';
  };
  attributes: {
    TestimonialsCard: Schema.Attribute.Component<
      'section.testimonials-card',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionTestimonialsCard extends Struct.ComponentSchema {
  collectionName: 'components_section_testimonials_cards';
  info: {
    displayName: 'testimonials-card';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    quote: Schema.Attribute.String;
    rating: Schema.Attribute.Integer;
    role: Schema.Attribute.String;
  };
}

export interface SectionTopCourses extends Struct.ComponentSchema {
  collectionName: 'components_section_top_courses';
  info: {
    displayName: 'top-courses';
  };
  attributes: {
    coursecard: Schema.Attribute.Component<'section.course-card', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionWhyChooseUs extends Struct.ComponentSchema {
  collectionName: 'components_section_why_choose_uses';
  info: {
    displayName: 'why-choose-us';
  };
  attributes: {
    featurecard: Schema.Attribute.Component<'section.feature-card', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'element.link': ElementLink;
      'element.logo': ElementLogo;
      'footer.contact-info': FooterContactInfo;
      'footer.link': FooterLink;
      'footer.link-group': FooterLinkGroup;
      'nav-link.nav-text': NavLinkNavText;
      'section.category-card': SectionCategoryCard;
      'section.course-card': SectionCourseCard;
      'section.course-categories': SectionCourseCategories;
      'section.course-highlight': SectionCourseHighlight;
      'section.cta': SectionCta;
      'section.feature': SectionFeature;
      'section.feature-card': SectionFeatureCard;
      'section.hero': SectionHero;
      'section.hero-slider': SectionHeroSlider;
      'section.stats': SectionStats;
      'section.testimonials': SectionTestimonials;
      'section.testimonials-card': SectionTestimonialsCard;
      'section.top-courses': SectionTopCourses;
      'section.why-choose-us': SectionWhyChooseUs;
    }
  }
}
