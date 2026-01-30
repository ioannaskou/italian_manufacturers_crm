import { Request, Response } from 'express';
import * as productCategoryService from '../services/productCategory.service';

export const createProductCategory = async (req: Request, res: Response) => {
  try {
    const category = await productCategoryService.createProductCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const getProductCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await productCategoryService.findProductCategoryById(req.params.id as string);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const getAllProductCategories = async (req: Request, res: Response) => {
  try {
    const categories = await productCategoryService.findAllProductCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};


export const updateProductCategory = async (req: Request, res: Response) => {
  try {
    const category = await productCategoryService.updateProductCategory(req.params.id as string, req.body);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const deleteProductCategory = async (req: Request, res: Response) => {
  try {
    const category = await productCategoryService.deleteProductCategory(req.params.id as string);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};
