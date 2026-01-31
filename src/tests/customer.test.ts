import request from 'supertest';
import express from 'express';

// IMPORTANT: Mock the middleware BEFORE importing routes
jest.mock('../middlewares/auth.middleware', () => ({
  protect: (req: any, res: any, next: any) => {
    req.user = { id: 'test-user-id', role: 'Admin' };
    next();
  }
}));

jest.mock('../middlewares/role.middleware', () => ({
  authorize: (...roles: string[]) => {
    return (req: any, res: any, next: any) => {
      next();
    };
  }
}));

// NOW import routes after mocking
import customerRoutes from '../routes/customer.routes';

const app = express();
app.use(express.json());
app.use('/api/customers', customerRoutes);

describe('Customer Tests', () => {

  describe('POST /api/customers - Create Customer', () => {
    it('should create a new customer', async () => {
      const newCustomer = {
        type: 'company',
        name: 'Boutique Eleganza',
        email: 'contact@eleganza.fr',
        phone: '+33 1 42 86 82 00',
        address: {
          street: 'Rue de la Paix 45',
          city: 'Paris',
          postalCode: '75002',
          country: 'France'
        }
      };

      const res = await request(app)
        .post('/api/customers')
        .send(newCustomer);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Boutique Eleganza');
      expect(res.body.address.city).toBe('Paris');
    });

    it('should fail without required fields', async () => {
      const res = await request(app)
        .post('/api/customers')
        .send({ address: { city: 'Lyon' } });

      expect(res.status).toBe(400);
      // optional but good:
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/customers - Get All Customers', () => {
    it('should return all customers', async () => {
      const res = await request(app).get('/api/customers');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/customers/:id - Get Customer by ID', () => {
    it('should return a customer by ID', async () => {
      const createRes = await request(app)
        .post('/api/customers')
        .send({
          type: 'company',
          name: 'Test Customer',
          email: 'test@test.com',
          phone: '+30 210 1234567',
          address: {
            street: 'Test St',
            city: 'Berlin',
            postalCode: '12345',
            country: 'Germany'
          }
        });

      const customerId = createRes.body._id;

      const res = await request(app).get(`/api/customers/${customerId}`);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(customerId);
      expect(res.body.name).toBe('Test Customer');
    });

    it('should return 404 for non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/api/customers/${fakeId}`);

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/customers/:id - Update Customer', () => {
    it('should update a customer', async () => {
      const createRes = await request(app)
        .post('/api/customers')
        .send({
          type: 'company',
          name: 'Original Customer',
          email: 'original@test.com',
          phone: '+34 91 1234567',
          address: {
            street: 'Test St',
            city: 'Madrid',
            postalCode: '28001',
            country: 'Spain'
          }
        });

      const customerId = createRes.body._id;

      const res = await request(app)
        .put(`/api/customers/${customerId}`)
        .send({
          type: 'company',
          name: 'Updated Customer',
          email: 'updated@test.com',
          phone: '+34 93 1234567',
          address: {
            street: 'Updated St',
            city: 'Barcelona',
            postalCode: '08001',
            country: 'Spain'
          }
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated Customer');
      expect(res.body.address.city).toBe('Barcelona');
    });
  });

  describe('DELETE /api/customers/:id - Delete Customer', () => {
    it('should delete a customer', async () => {
      const createRes = await request(app)
        .post('/api/customers')
        .send({
          type: 'individual',
          name: 'To Delete Customer',
          email: 'delete@test.com',
          phone: '+31 20 1234567',
          address: {
            street: 'Delete St',
            city: 'Amsterdam',
            postalCode: '1012',
            country: 'Netherlands'
          }
        });

      const customerId = createRes.body._id;

      const res = await request(app).delete(`/api/customers/${customerId}`);

      expect(res.status).toBe(204);

      const getRes = await request(app).get(`/api/customers/${customerId}`);
      expect(getRes.status).toBe(404);
    });
  });
});
