import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Backend Task Api',
      version: '1.0.0',
      description: 'Api documentation for the Backend Task',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Make sure your routes have Swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);


export const setupSwaggerDocs = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`✅ Swagger docs available at http://localhost:${process.env.PORT || 3000}/api-docs`);
};
