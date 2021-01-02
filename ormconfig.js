module.exports = {
	type: 'mariadb',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
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
