import { Request, Response } from 'express';
import * as customerService from '../services/customer.service';
import * as customerManufacturerService from '../services/customerManufacturer.service';

const handleError = (res: Response, error: any) => {
  // Mongoose validation errors (missing required fields, invalid schema)
  if (error?.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  // Invalid Mongo ObjectId / casting issues
  if (error?.name === 'CastError') {
    return res.status(400).json({ message: `Invalid ${error.path}: ${error.value}` });
  }

  // Duplicate key error (e.g., unique fields)
  if (error?.code === 11000) {
    return res.status(409).json({ message: 'Duplicate key error', details: error.keyValue });
  }

  // Unknown/unexpected error
  console.error(error);
  return res.status(500).json({ message: 'An internal server error occurred' });
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    return res.status(201).json(customer);
  } catch (error: any) {
    return handleError(res, error);
  }
};

export const getCustomerManufacturers = async (req: Request, res: Response) => {
  try {
    const links = await customerManufacturerService.findRelationshipsForCustomer(
      req.params.customerId as string
    );
    return res.status(200).json(links);
  } catch (error: any) {
    return handleError(res, error);
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerService.findAllCustomers(req.query);
    return res.status(200).json(customers);
  } catch (error: any) {
    return handleError(res, error);
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.findCustomerById(req.params.id as string);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (error: any) {
    return handleError(res, error);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.updateCustomer(req.params.id as string, req.body);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (error: any) {
    return handleError(res, error);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.deleteCustomer(req.params.id as string);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(204).send();
  } catch (error: any) {
    return handleError(res, error);
  }
};
