import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: 'Admin' | 'Sales';
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Sales'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, {
  collection: "users",
  timestamps: true
});

export default model<IUser>("User", UserSchema);
