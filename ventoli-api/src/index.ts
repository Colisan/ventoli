import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import * as bodyParser from 'body-parser';
import routes from './route';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const docOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Ventoli-Api',
			version: '0.1.0',
		},
	},
	apis: ['**/*.ts'],
};
const swaggerDoc = swaggerJsdoc(docOptions);

process.env.TZ = 'utc';

createConnection()
	.then(async (connection) => {
		// create express app
		const app = express();
		app.use(cors());
		app.use(helmet());
		app.use(bodyParser.json());

		app.use('/api', routes);
		app.use(
			'/',
			swaggerUi.serve,
			swaggerUi.setup(swaggerDoc, { explorer: true })
		);

		// start express server
		app.listen(3000);

		console.log('Express server has started on port 3000.');
	})
	.catch((error) => console.log(error));
