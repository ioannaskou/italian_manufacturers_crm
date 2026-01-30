import Manufacturer, { IManufacturer } from '../models/manufacturer.model';

export const findAllManufacturers = async (query: any) => {
  // Basic filtering example: by name
  const filter: { [key: string]: any } = {};
  if (query.name) {
    filter.name = { $regex: query.name, $options: 'i' };
  }
  return Manufacturer.find(filter).lean();
};

export const findManufacturerById = async (id: string) => {
  return Manufacturer.findById(id).lean();
};

export const createManufacturer = async (payload: Partial<IManufacturer>) => {
  const manufacturer = new Manufacturer(payload);
  return manufacturer.save();
};

export const updateManufacturer = async (id: string, payload: Partial<IManufacturer>) => {
  return Manufacturer.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteManufacturer = async (id: string) => {
  return Manufacturer.findByIdAndDelete(id);
};
