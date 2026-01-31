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
import productCategoryRoutes from '../routes/productCategory.routes';

const app = express();
app.use(express.json());
app.use('/api/product-categories', productCategoryRoutes);

describe('Product Category Tests', () => {
  
  describe('POST /api/product-categories - Create Product Category', () => {
    it('should create a new product category', async () => {
      const newCategory = {
        name: 'Luxury Handbags',
        description: 'High-end designer handbags'
      };

      const res = await request(app)
        .post('/api/product-categories')
        .send(newCategory);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Luxury Handbags');
      expect(res.body.description).toBe('High-end designer handbags');
    });

    it('should fail without required name', async () => {
  const res = await request(app)
    .post('/api/product-categories')
    .send({ description: 'No name provided' });

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('message', 'Validation error');
  expect(Array.isArray(res.body.errors)).toBe(true);
});

  });

  describe('GET /api/product-categories - Get All Product Categories', () => {
    it('should return all product categories', async () => {
      const res = await request(app).get('/api/product-categories');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/product-categories/:id - Get Product Category by ID', () => {
    it('should return a product category by ID', async () => {
      const createRes = await request(app)
        .post('/api/product-categories')
        .send({
          name: 'Test Category',
          description: 'Test description'
        });

      const categoryId = createRes.body._id;

      const res = await request(app).get(`/api/product-categories/${categoryId}`);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(categoryId);
      expect(res.body.name).toBe('Test Category');
    });

    it('should return 404 for non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/api/product-categories/${fakeId}`);

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/product-categories/:id - Update Product Category', () => {
    it('should update a product category', async () => {
      const createRes = await request(app)
        .post('/api/product-categories')
        .send({
          name: 'Original Category',
          description: 'Original description'
        });

      const categoryId = createRes.body._id;

      const res = await request(app)
        .put(`/api/product-categories/${categoryId}`)
        .send({
          name: 'Updated Category',
          description: 'Updated description'
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated Category');
      expect(res.body.description).toBe('Updated description');
    });
  });

  describe('DELETE /api/product-categories/:id - Delete Product Category', () => {
    it('should delete a product category', async () => {
      const createRes = await request(app)
        .post('/api/product-categories')
        .send({
          name: 'To Delete Category',
          description: 'Will be deleted'
        });

      const categoryId = createRes.body._id;

      const res = await request(app).delete(`/api/product-categories/${categoryId}`);

      expect(res.status).toBe(204);

      const getRes = await request(app).get(`/api/product-categories/${categoryId}`);
      expect(getRes.status).toBe(404);
    });
  });
});