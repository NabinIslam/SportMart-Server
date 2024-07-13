/* eslint-disable @typescript-eslint/no-explicit-any */
import slugify from 'slugify';
import AppError from '../../error/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createProductIntoDB = async (payload: TProduct) => {
  // checking if the category is already exists
  const alreadyExists = await Product.findOne({
    name: payload.name,
  });

  if (alreadyExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'This product already exists');

  const createdProduct = {
    ...payload,
    slug: slugify(payload.name, { lower: true, trim: true }),
  };

  const product = await Product.create(createdProduct);

  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not create the product');
  }

  return product;
};

const getAllProductsFromDB = async (
  filter: {
    category?: mongoose.Types.ObjectId | string;
    brand?: mongoose.Types.ObjectId | string;
  },
  sortOption: any,
) => {
  const products = await Product.find(filter)
    .sort(sortOption)
    .populate('category')
    .populate('brand');

  if (!products)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not find the products');

  return products;
};

const getASingleProductBySlugFromDB = async (slug: string) => {
  const product = await Product.findOne({ slug })
    .populate('category')
    .populate('brand');

  if (!product)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not find the product');

  return product;
};

const deleteProductFromDB = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not delete the product');

  return product;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  deleteProductFromDB,
  getASingleProductBySlugFromDB,
};
