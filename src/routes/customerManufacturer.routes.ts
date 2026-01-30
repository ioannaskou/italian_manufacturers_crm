import { Router } from 'express';
import { createCustomerManufacturer, deleteCustomerManufacturer, updateCustomerManufacturer, getAllCustomerManufacturers } from '../controllers/customerManufacturer.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

/**
 * @openapi
 * /api/customer-manufacturers:
 *   get:
 *     tags:
 *       - Relationships
 *     summary: Get all customer-manufacturer relationships
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of relationships
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, getAllCustomerManufacturers);

/**
 * @openapi
 * /api/customer-manufacturers:
 *   post:
 *     tags:
 *       - Relationships
 *     summary: Create a new customer-manufacturer relationship
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerManufacturer'
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
router.post('/', protect, authorize('Admin', 'Sales'), createCustomerManufacturer);

/**
 * @openapi
 * /api/customer-manufacturers/{id}:
 *   delete:
 *     tags:
 *       - Relationships
 *     summary: Delete a customer-manufacturer relationship
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
 *         description: Relationship deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Relationship not found
 */
router.delete('/:id', protect, authorize('Admin', 'Sales'), deleteCustomerManufacturer);

/**
 * @openapi
 * /api/customer-manufacturers/{id}:
 *   put:
 *     tags:
 *       - Relationships
 *     summary: Update a customer-manufacturer relationship
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
 *             $ref: '#/components/schemas/CustomerManufacturer'
 *     responses:
 *       200:
 *         description: Relationship updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Relationship not found
 */
router.put('/:id', protect, authorize('Admin', 'Sales'), updateCustomerManufacturer);

export default router;
