import { Request, Response } from 'express';
import * as customerManufacturerService from '../services/customerManufacturer.service';

export const getAllCustomerManufacturers = async (req: Request, res: Response) => {
  try {
    const relationships = await customerManufacturerService.getAllRelationships();
    res.status(200).json(relationships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const createCustomerManufacturer = async (req: Request, res: Response) => {
  try {
    const link = await customerManufacturerService.linkManufacturerToCustomer(req.body);
    res.status(201).json(link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const deleteCustomerManufacturer = async (req: Request, res: Response) => {
  try {
    const link = await customerManufacturerService.unlinkManufacturerFromCustomer(req.params.id as string);
    if (!link) {
      return res.status(404).json({ message: 'Relationship not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const updateCustomerManufacturer = async (req: Request, res: Response) => {
  try {
    const link = await customerManufacturerService.updateRelationship(req.params.id as string, req.body);
    if (!link) {
      return res.status(404).json({ message: 'Relationship not found' });
    }
    res.status(200).json(link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};
