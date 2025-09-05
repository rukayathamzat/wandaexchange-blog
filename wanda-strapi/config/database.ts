export default ({ env }) => ({
      connection: {
    client: env('DATABASE_CLIENT', 'postgres'),
      connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'wandaexchange_blog'),
        user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'password'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
        rejectUnauthorized: env.bool(
          'DATABASE_SSL_REJECT_UNAUTHORIZED',
          true
        ),
      },
      schema: env('DATABASE_SCHEMA', 'public'),
    },
    debug: false,
  },
});