import { Schema, model, Document } from "mongoose";
import { ICustomer } from './customer.model';
import { IManufacturer } from './manufacturer.model';

export interface ICustomerManufacturer extends Document {
  customer: ICustomer['_id'];
  manufacturer: IManufacturer['_id'];
  relationshipStatus: 'lead' | 'active' | 'inactive';
  notes?: string;
}

const CustomerManufacturerSchema = new Schema<ICustomerManufacturer>({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  relationshipStatus: { type: String, enum: ['lead', 'active', 'inactive'], required: true },
  notes: { type: String },
}, {
  collection: "customer_manufacturers",
  timestamps: true
});

CustomerManufacturerSchema.index({ customer: 1, manufacturer: 1 }, { unique: true });

export default model<ICustomerManufacturer>("CustomerManufacturer", CustomerManufacturerSchema);
