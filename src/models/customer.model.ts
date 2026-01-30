import { Schema, model, Document } from "mongoose";
import { IUser } from './user.model';

export interface ICustomer extends Document {
  type: 'company' | 'individual';
  name: string;
  vatNumber?: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
  assignedSalesRep?: IUser['_id'];
}

const CustomerSchema = new Schema<ICustomer>({
  type: { type: String, enum: ['company', 'individual'], required: true },
  name: { type: String, required: true },
  vatNumber: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  notes: { type: String },
  assignedSalesRep: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  collection: "customers",
  timestamps: true
});

export default model<ICustomer>("Customer", CustomerSchema);
