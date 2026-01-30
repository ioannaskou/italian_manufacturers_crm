import { Router } from 'express';
import { createManufacturerProductCategory, deleteManufacturerProductCategory, getAllManufacturerProductCategories } from '../controllers/manufacturerProductCategory.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

/**
 * @openapi
 * /api/manufacturer-product-categories:
 *   get:
 *     tags:
 *       - Relationships
 *     summary: Get all manufacturer-product category relationships
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of relationships
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, getAllManufacturerProductCategories);

/**
 * @openapi
 * /api/manufacturer-product-categories:
 *   post:
 *     tags:
 *       - Relationships
 *     summary: Create a new manufacturer-product category relationship
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ManufacturerProductCategory'
 *     responses:
 *       201:
 *         description: Relationship created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', protect, authorize('Admin'), createManufacturerProductCategory);

/**
 * @openapi
 * /api/manufacturer-product-categories/{manufacturerId}/{productCategoryId}:
 *   delete:
 *     tags:
 *       - Relationships
 *     summary: Delete a manufacturer-product category relationship
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: manufacturerId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productCategoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Relationship deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Relationship not found
 */
router.delete('/:manufacturerId/:productCategoryId', protect, authorize('Admin'), deleteManufacturerProductCategory);

export default router;
