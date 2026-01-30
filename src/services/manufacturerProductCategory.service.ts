import ManufacturerProductCategory, { IManufacturerProductCategory } from '../models/manufacturerProductCategory.model';

export const getAllRelationships = async () => {
  return ManufacturerProductCategory.find().populate('manufacturer').populate('productCategory').lean();
};

export const linkCategoryToManufacturer = async (payload: Partial<IManufacturerProductCategory>) => {
  const link = new ManufacturerProductCategory(payload);
  return link.save();
};

export const deleteRelationship = async (id: string) => {
  return ManufacturerProductCategory.findByIdAndDelete(id);
};

export const unlinkCategoryFromManufacturer = async (manufacturerId: string, productCategoryId: string) => {
  return ManufacturerProductCategory.findOneAndDelete({ manufacturer: manufacturerId, productCategory: productCategoryId });
};

export const findCategoriesForManufacturer = async (manufacturerId: string) => {
  return ManufacturerProductCategory.find({ manufacturer: manufacturerId }).populate('productCategory').lean();
};
