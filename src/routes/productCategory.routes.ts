import { Router } from 'express';
import { createProductCategory, getAllProductCategories, getProductCategoryById, updateProductCategory, deleteProductCategory } from '../controllers/productCategory.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

/**
 * @openapi
 * /api/product-categories:
 *   post:
 *     tags:
 *       - Product Categories
 *     summary: Create a new product category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCategory'
 *     responses:
 *       201:
 *         description: Product category created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', protect, authorize('Admin'), createProductCategory);

/**
 * @openapi
 * /api/product-categories:
 *   get:
 *     tags:
 *       - Product Categories
 *     summary: Get all product categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductCategory'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', protect, authorize('Admin', 'Sales'), getAllProductCategories);

/**
 * @openapi
 * /api/product-categories/{id}:
 *   get:
 *     tags:
 *       - Product Categories
 *     summary: Get a product category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product category not found
 */
router.get('/:id', protect, authorize('Admin', 'Sales'), getProductCategoryById);

/**
 * @openapi
 * /api/product-categories/{id}:
 *   put:
 *     tags:
 *       - Product Categories
 *     summary: Update a product category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCategory'
 *     responses:
 *       200:
 *         description: Product category updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product category not found
 */
router.put('/:id', protect, authorize('Admin'), updateProductCategory);

/**
 * @openapi
 * /api/product-categories/{id}:
 *   delete:
 *     tags:
 *       - Product Categories
 *     summary: Delete a product category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product category deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product category not found
 */
router.delete('/:id', protect, authorize('Admin'), deleteProductCategory);

export default router;
