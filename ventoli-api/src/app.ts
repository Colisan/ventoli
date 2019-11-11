import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import ApiRouter from './route/apiRouter';
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
  .then(async connection => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    const apiRouter = new ApiRouter();
    apiRouter.setupRoutes();
    app.use('/api', apiRouter.router);

    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

    app.listen(3000, () => {
      console.log('Server started on port 3000!');
    });
  })
  .catch(error => console.log(error));
