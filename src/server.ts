import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import manufacturerRoutes from './routes/manufacturer.routes';
import customerRoutes from './routes/customer.routes';
import productCategoryRoutes from './routes/productCategory.routes';
import customerManufacturerRoutes from './routes/customerManufacturer.routes';
import manufacturerProductCategoryRoutes from './routes/manufacturerProductCategory.routes';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Italian Manufacturers CRM API');
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/manufacturers', manufacturerRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/customer-manufacturers', customerManufacturerRoutes);
app.use('/api/manufacturer-product-categories', manufacturerProductCategoryRoutes);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
