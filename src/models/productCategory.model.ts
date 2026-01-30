import { Schema, model, Document } from "mongoose";

export interface IProductCategory extends Document {
  name: string;
  description?: string;
}

const ProductCategorySchema = new Schema<IProductCategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, {
  collection: "product_categories",
  timestamps: true
});

export default model<IProductCategory>("ProductCategory", ProductCategorySchema);
