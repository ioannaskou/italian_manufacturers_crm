import { Request, Response } from 'express';
import * as manufacturerService from '../services/manufacturer.service';

export const createManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerService.createManufacturer(req.body);
    res.status(201).json(manufacturer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const getAllManufacturers = async (req: Request, res: Response) => {
  try {
    const manufacturers = await manufacturerService.findAllManufacturers(req.query);
    res.status(200).json(manufacturers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const getManufacturerById = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerService.findManufacturerById(req.params.id as string);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(200).json(manufacturer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const updateManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerService.updateManufacturer(req.params.id as string, req.body);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(200).json(manufacturer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const deleteManufacturer = async (req: Request, res: Response) => {
  try {
    const manufacturer = await manufacturerService.deleteManufacturer(req.params.id as string);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};
