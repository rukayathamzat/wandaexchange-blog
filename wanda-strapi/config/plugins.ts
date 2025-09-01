export default {
  'i18n': {
    enabled: true,
    defaultLocale: 'en',
    locales: ['en', 'pl'],
  },
  'upload': {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000,
      },
    },
  },
};
