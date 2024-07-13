import { Schema, model } from 'mongoose';
import { TBrand } from './brand.interface';

const brandSchema = new Schema<TBrand>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Brand = model<TBrand>('Brand', brandSchema);
