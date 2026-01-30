import ProductCategory, { IProductCategory } from '../models/productCategory.model';

export const findAllProductCategories = async () => {
  return ProductCategory.find().lean();
};

export const findProductCategoryById = async (id: string) => {
  return ProductCategory.findById(id).lean();
};

export const createProductCategory = async (payload: Partial<IProductCategory>) => {
  const category = new ProductCategory(payload);
  return category.save();
};

export const updateProductCategory = async (id: string, payload: Partial<IProductCategory>) => {
  return ProductCategory.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteProductCategory = async (id: string) => {
  return ProductCategory.findByIdAndDelete(id);
};
