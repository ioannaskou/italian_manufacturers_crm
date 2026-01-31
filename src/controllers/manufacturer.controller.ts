import { Request, Response } from 'express';
import * as manufacturerService from '../services/manufacturer.service';

const shouldLog = () => process.env.NODE_ENV !== 'test';

const handleError = (res: Response, error: any) => {

  // Mongoose validation error (missing required fields, etc.)
  if (error?.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.errors
    });
  }

  // Mongo duplicate key error
  if (error?.code === 11000) {
    return res.status(409).json({
      message: 'Duplicate key error',
      keyValue: error.keyValue
    });
  }

  // Unexpected error
  if (shouldLog()) {
    console.error(error);
  }

  return res.status(500).json({ message: 'An internal server error occurred' });
};

export const createManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerService.createManufacturer(req.body);
    return res.status(201).json(manufacturer);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllManufacturers = async (req: Request, res: Response) => {
  try {
    const manufacturers = await manufacturerService.findAllManufacturers(req.query);
    return res.status(200).json(manufacturers);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getManufacturerById = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerService.findManufacturerById(req.params.id as string);

    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    return res.status(200).json(manufacturer);
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerService.updateManufacturer(
      req.params.id as string,
      req.body
    );

    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    return res.status(200).json(manufacturer);
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerService.deleteManufacturer(req.params.id as string);

    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return handleError(res, error);
  }
};
