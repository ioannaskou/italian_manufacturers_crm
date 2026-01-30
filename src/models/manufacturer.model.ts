import { Schema, model, Document } from "mongoose";

export interface IManufacturer extends Document {
  name: string;
  vatNumber?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string;
}

const ManufacturerSchema = new Schema<IManufacturer>({
  name: { type: String, required: true },
  vatNumber: { type: String, unique: true, sparse: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  contactPersonName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  notes: { type: String },
}, {
  collection: "manufacturers",
  timestamps: true
});

export default model<IManufacturer>("Manufacturer", ManufacturerSchema);
