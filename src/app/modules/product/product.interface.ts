import { ObjectId } from 'mongoose';

export type TProduct = {
  name: string;
  slug?: string;
  description: string;
  category: ObjectId;
  brand: ObjectId;
  stockQuantity: number;
  rating: number;
  price: number;
  image: string;
};

export type TFilterQuery = {
  category?: string;
  brand?: string;
  sortBy?: string;
};
