import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      'en',
      'pl',
    ],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "WandaExchange Blog",
        "app.components.LeftMenu.navbrand.workplace": "Admin Panel",
      },
      pl: {
        "app.components.LeftMenu.navbrand.title": "WandaExchange Blog",
        "app.components.LeftMenu.navbrand.workplace": "Panel Administracyjny",
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log('WandaExchange Blog Admin Panel initialized');
  },
};
