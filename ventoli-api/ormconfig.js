const config = require('./config');

module.exports = {
  type: 'mariadb',
  host: config.db_host,
  port: config.db_port,
  username: config.db_username,
  password: config.db_password,
  database: config.db_database,
  timezone: '+00:00',
  synchronize: true,
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
