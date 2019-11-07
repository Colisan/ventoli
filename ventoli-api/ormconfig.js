const config = require('./config');

module.exports = {
  type: 'mariadb',
  host: config.db_host,
  port: config.db_port,
  username: config.db_username,
  password: config.db_password,
  database: config.db_database,
  synchronize: true,
  logging: false,
  entities: ['build/entity/**/*.js'],
  migrations: ['build/migration/**/*.js'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
