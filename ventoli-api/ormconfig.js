import * as config from './config';

module.exports = {
  type: 'mariadb',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  timezone: '+00:00',
  synchronize: false,
  logging: false,
  entities: ['src/entity/**/!(*.test).ts'],
  migrations: ['src/migration/**/!(*.test).ts'],
  subscribers: ['src/subscriber/**/!(*.test).ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
