import type { Schema, Struct } from '@strapi/strapi';

export interface SiteComponentsContentAndImage extends Struct.ComponentSchema {
  collectionName: 'components_site_components_content_and_images';
  info: {
    displayName: 'content_and_image';
    icon: 'bulletList';
  };
  attributes: {
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.Blocks;
  };
}

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

export interface SiteComponentsProjectImpact extends Struct.ComponentSchema {
  collectionName: 'components_site_components_project_impacts';
  info: {
    displayName: 'project_impact';
    icon: 'seed';
  };
  attributes: {
    description: Schema.Attribute.Text;
    media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    quantity: Schema.Attribute.String;
    verb: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'site-components.content-and-image': SiteComponentsContentAndImage;
      'site-components.optional-section': SiteComponentsOptionalSection;
      'site-components.project-impact': SiteComponentsProjectImpact;
    }
  }
}
