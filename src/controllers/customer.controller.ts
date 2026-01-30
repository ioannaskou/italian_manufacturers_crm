import { Request, Response } from 'express';
import * as customerService from '../services/customer.service';
import * as customerManufacturerService from '../services/customerManufacturer.service';

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const getCustomerManufacturers = async (req: Request, res: Response) => {
  try {
    const links = await customerManufacturerService.findRelationshipsForCustomer(req.params.customerId as string);
    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerService.findAllCustomers(req.query);
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.findCustomerById(req.params.id as string);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.updateCustomer(req.params.id as string, req.body);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.deleteCustomer(req.params.id as string);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};
