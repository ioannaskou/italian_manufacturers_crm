import { Schema, model, Document } from "mongoose";
import { IManufacturer } from './manufacturer.model';
import { IProductCategory } from './productCategory.model';

export interface IManufacturerProductCategory extends Document {
  manufacturer: IManufacturer['_id'];
  productCategory: IProductCategory['_id'];
}

const ManufacturerProductCategorySchema = new Schema<IManufacturerProductCategory>({
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  productCategory: { type: Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
}, {
  collection: "manufacturer_product_categories",
  timestamps: true
});

ManufacturerProductCategorySchema.index({ manufacturer: 1, productCategory: 1 }, { unique: true });

export default model<IManufacturerProductCategory>("ManufacturerProductCategory", ManufacturerProductCategorySchema);
