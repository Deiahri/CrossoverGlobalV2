import type { Schema, Struct } from '@strapi/strapi';

export interface SiteComponentsOptionalSection extends Struct.ComponentSchema {
  collectionName: 'components_site_components_optional_sections';
  info: {
    displayName: 'optional_section';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'site-components.optional-section': SiteComponentsOptionalSection;
    }
  }
}
