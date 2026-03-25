import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    cta: Schema.Attribute.Component<'element.link', false>;
    heading: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Component<'element.logo', false>;
    theme: Schema.Attribute.Enumeration<['orange', 'white', 'Deep Blue']>;
  };
}

export interface BlocksInfoBlocks extends Struct.ComponentSchema {
  collectionName: 'components_blocks_info_blocks';
  info: {
    displayName: 'info-blocks';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    theme: Schema.Attribute.Enumeration<['blue']>;
  };
}

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.hero-section': BlocksHeroSection;
      'blocks.info-blocks': BlocksInfoBlocks;
      'element.link': ElementLink;
      'element.logo': ElementLogo;
      'nav-link.nav-text': NavLinkNavText;
    }
  }
}
