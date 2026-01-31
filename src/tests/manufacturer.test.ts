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
import manufacturerRoutes from '../routes/manufacturer.routes';

const app = express();
app.use(express.json());
app.use('/api/manufacturers', manufacturerRoutes);

describe('Manufacturer Tests', () => {
  
  describe('POST /api/manufacturers - Create Manufacturer', () => {
    it('should create a new manufacturer', async () => {
      const newManufacturer = {
        name: 'Milano Fashion House',
        contactPersonName: 'Giovanni Rossi',
        contactEmail: 'info@milanofashion.it',
        contactPhone: '+39 02 1234567',
        address: {
          street: 'Via Roma 123',
          city: 'Milano',
          postalCode: '20100',
          country: 'Italy'
        }
      };

      const res = await request(app)
        .post('/api/manufacturers')
        .send(newManufacturer);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Milano Fashion House');
      expect(res.body.address.city).toBe('Milano');
    });

    it('should fail without required fields', async () => {
      const res = await request(app)
      .post('/api/manufacturers')
      .send({ address: { city: 'Rome' }});
      
      expect(res.status).toBe(400);
    
    });


  describe('GET /api/manufacturers - Get All Manufacturers', () => {
    it('should return all manufacturers', async () => {
      const res = await request(app).get('/api/manufacturers');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/manufacturers/:id - Get Manufacturer by ID', () => {
    it('should return a manufacturer by ID', async () => {
      const createRes = await request(app)
        .post('/api/manufacturers')
        .send({
          name: 'Test Manufacturer',
          contactPersonName: 'Test Contact',
          contactEmail: 'test@manufacturer.it',
          contactPhone: '+39 06 1234567',
          address: { 
            street: 'Test Via', 
            city: 'Rome', 
            postalCode: '00100', 
            country: 'Italy' 
          }
        });

      const manufacturerId = createRes.body._id;

      const res = await request(app).get(`/api/manufacturers/${manufacturerId}`);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(manufacturerId);
      expect(res.body.name).toBe('Test Manufacturer');
    });

    it('should return 404 for non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/api/manufacturers/${fakeId}`);

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/manufacturers/:id - Update Manufacturer', () => {
    it('should update a manufacturer', async () => {
      const createRes = await request(app)
        .post('/api/manufacturers')
        .send({
          name: 'Original Name',
          contactPersonName: 'Original Contact',
          contactEmail: 'original@manufacturer.it',
          contactPhone: '+39 02 7654321',
          address: { 
            street: 'Original Via', 
            city: 'Milan', 
            postalCode: '20100', 
            country: 'Italy' 
          }
        });

      const manufacturerId = createRes.body._id;

      const res = await request(app)
        .put(`/api/manufacturers/${manufacturerId}`)
        .send({
          name: 'Updated Name',
          contactPersonName: 'Updated Contact',
          contactEmail: 'updated@manufacturer.it',
          contactPhone: '+39 06 7654321',
          address: { 
            street: 'Updated Via', 
            city: 'Rome', 
            postalCode: '00100', 
            country: 'Italy' 
          }
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated Name');
      expect(res.body.address.city).toBe('Rome');
    });
  });

  describe('DELETE /api/manufacturers/:id - Delete Manufacturer', () => {
    it('should delete a manufacturer', async () => {
      const createRes = await request(app)
        .post('/api/manufacturers')
        .send({
          name: 'To Delete',
          contactPersonName: 'Delete Contact',
          contactEmail: 'delete@manufacturer.it',
          contactPhone: '+39 081 1234567',
          address: { 
            street: 'Delete Via', 
            city: 'Naples', 
            postalCode: '80100', 
            country: 'Italy' 
          }
        });

      const manufacturerId = createRes.body._id;

      const res = await request(app).delete(`/api/manufacturers/${manufacturerId}`);

      expect(res.status).toBe(204);

      const getRes = await request(app).get(`/api/manufacturers/${manufacturerId}`);
      expect(getRes.status).toBe(404);
    });
  });
})});