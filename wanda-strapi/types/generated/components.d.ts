import type { Schema, Struct } from '@strapi/strapi';

export interface SeoTitleSeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_seo_title_seo_metas';
  info: {
    displayName: 'seo.meta';
    icon: 'server';
  };
  attributes: {
    seoDescription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    seoKeywords: Schema.Attribute.JSON &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    seoTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SeokeywordsSeoKeywords extends Struct.ComponentSchema {
  collectionName: 'components_seokeywords_seo_keywords';
  info: {
    displayName: 'SeoKeywords';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'seo-title.seo-meta': SeoTitleSeoMeta;
      'seokeywords.seo-keywords': SeokeywordsSeoKeywords;
    }
  }
}
