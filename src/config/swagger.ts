import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Italian Manufacturers CRM API',
      version: '1.0.0',
      description: 'REST API for managing Italian clothing manufacturers, customers, and their relationships',
      contact: {
        name: 'API Support',
        email: 'support@italiancrm.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['Admin', 'Sales'] },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            status: { type: 'string', enum: ['active', 'inactive'] }
          }
        },
        Customer: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['company', 'individual'] },
            name: { type: 'string' },
            vatNumber: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                postalCode: { type: 'string' },
                country: { type: 'string' }
              }
            },
            notes: { type: 'string' },
            assignedSalesRep: { type: 'string' }
          }
        },
        Manufacturer: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            vatNumber: { type: 'string' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                postalCode: { type: 'string' },
                country: { type: 'string' }
              }
            },
            contactPersonName: { type: 'string' },
            contactEmail: { type: 'string', format: 'email' },
            contactPhone: { type: 'string' },
            notes: { type: 'string' }
          }
        },
        ProductCategory: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' }
          }
        },
        Login: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
          }
        },
        CustomerManufacturer: {
          type: 'object',
          properties: {
            customer: { type: 'string' },
            manufacturer: { type: 'string' },
            relationshipStatus: { type: 'string', enum: ['lead', 'active', 'inactive'] },
            notes: { type: 'string' }
          }
        },
        ManufacturerProductCategory: {
          type: 'object',
          properties: {
            manufacturer: { type: 'string' },
            productCategory: { type: 'string' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts'] // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);
console.log('CWD:', process.cwd());
//console.log('Swagger paths count:', Object.keys((swaggerSpec as any).paths || {}).length);


export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger documentation available at http://localhost:3000/api-docs');
};
