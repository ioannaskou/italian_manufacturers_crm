import CustomerManufacturer, { ICustomerManufacturer } from '../models/customerManufacturer.model';

export const getAllRelationships = async () => {
  return CustomerManufacturer.find().populate('customer').populate('manufacturer').lean();
};

export const linkManufacturerToCustomer = async (payload: Partial<ICustomerManufacturer>) => {
  const link = new CustomerManufacturer(payload);
  return link.save();
};

export const updateRelationship = async (id: string, payload: Partial<ICustomerManufacturer>) => {
    return CustomerManufacturer.findByIdAndUpdate(id, payload, { new: true });
};

export const unlinkManufacturerFromCustomer = async (id: string) => {
  return CustomerManufacturer.findByIdAndDelete(id);
};

export const findRelationshipsForCustomer = async (customerId: string) => {
  return CustomerManufacturer.find({ customer: customerId }).populate('manufacturer', 'name contactPersonName').lean();
};
