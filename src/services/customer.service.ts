import Customer, { ICustomer } from '../models/customer.model';

export const findAllCustomers = async (query: any) => {
  // Example filter: by name or email
  const filter: { [key: string]: any } = {};
  if (query.name) {
    filter.name = { $regex: query.name, $options: 'i' };
  }
  if (query.email) {
    filter.email = { $regex: query.email, $options: 'i' };
  }
  return Customer.find(filter).populate('assignedSalesRep', 'firstName lastName').lean();
};

export const findCustomerById = async (id: string) => {
  return Customer.findById(id).populate('assignedSalesRep', 'firstName lastName').lean();
};

export const createCustomer = async (payload: Partial<ICustomer>) => {
  const customer = new Customer(payload);
  return customer.save();
};

export const updateCustomer = async (id: string, payload: Partial<ICustomer>) => {
  return Customer.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteCustomer = async (id: string) => {
  return Customer.findByIdAndDelete(id);
};
