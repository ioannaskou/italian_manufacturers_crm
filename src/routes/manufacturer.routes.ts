import { Router } from 'express';
import { createManufacturer, getAllManufacturers, getManufacturerById, updateManufacturer, deleteManufacturer } from '../controllers/manufacturer.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

/**
 * @openapi
 * /api/manufacturers:
 *   post:
 *     tags:
 *       - Manufacturers
 *     summary: Create a new manufacturer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manufacturer'
 *     responses:
 *       201:
 *         description: Manufacturer created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', protect, authorize('Admin'), createManufacturer);

/**
 * @openapi
 * /api/manufacturers:
 *   get:
 *     tags:
 *       - Manufacturers
 *     summary: Get all manufacturers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of manufacturers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Manufacturer'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', protect, authorize('Admin', 'Sales'), getAllManufacturers);

/**
 * @openapi
 * /api/manufacturers/{id}:
 *   get:
 *     tags:
 *       - Manufacturers
 *     summary: Get a manufacturer by ID
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
 *         description: Manufacturer details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manufacturer'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Manufacturer not found
 */
router.get('/:id', protect, authorize('Admin', 'Sales'), getManufacturerById);

/**
 * @openapi
 * /api/manufacturers/{id}:
 *   put:
 *     tags:
 *       - Manufacturers
 *     summary: Update a manufacturer
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
 *             $ref: '#/components/schemas/Manufacturer'
 *     responses:
 *       200:
 *         description: Manufacturer updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Manufacturer not found
 */
router.put('/:id', protect, authorize('Admin'), updateManufacturer);

/**
 * @openapi
 * /api/manufacturers/{id}:
 *   delete:
 *     tags:
 *       - Manufacturers
 *     summary: Delete a manufacturer
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
 *         description: Manufacturer deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Manufacturer not found
 */
router.delete('/:id', protect, authorize('Admin'), deleteManufacturer);

export default router;
