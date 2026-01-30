import { Request, Response } from 'express';
import * as manufacturerProductCategoryService from '../services/manufacturerProductCategory.service';

export const getAllManufacturerProductCategories = async (req: Request, res: Response) => {
  try {
    const relationships = await manufacturerProductCategoryService.getAllRelationships();
    res.status(200).json(relationships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const createManufacturerProductCategory = async (req: Request, res: Response) => {
  try {
    const link = await manufacturerProductCategoryService.linkCategoryToManufacturer(req.body);
    res.status(201).json(link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const deleteManufacturerProductCategory = async (req: Request, res: Response) => {
  try {
    const { manufacturerId, productCategoryId } = req.params;
    const link = await manufacturerProductCategoryService.unlinkCategoryFromManufacturer(manufacturerId as string, productCategoryId as string);
    if (!link) {
      return res.status(404).json({ message: 'Relationship not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};
