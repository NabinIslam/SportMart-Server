/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import { TFilterQuery } from './product.interface';
import { Category } from '../category/category.model';
import { Brand } from '../brand/brand.model';
import mongoose from 'mongoose';

const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product added successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const { category, brand, sortBy } = req.query as TFilterQuery;

  const filter: {
    category?: mongoose.Types.ObjectId | string;
    brand?: mongoose.Types.ObjectId | string;
  } = {};

  if (category) {
    const categoryDoc = await Category.findOne({ slug: category });
    if (categoryDoc) {
      filter.category = categoryDoc._id;
    } else {
      return res.status(404).json({ message: 'Category not found' });
    }
  }

  if (brand) {
    const brandDoc = await Brand.findOne({ slug: brand });
    if (brandDoc) {
      filter.brand = brandDoc._id;
    } else {
      return res.status(404).json({ message: 'Brand not found' });
    }
  }

  let sortOption = {};

  if (sortBy === 'price-high-low') {
    sortOption = { price: -1 };
  } else if (sortBy === 'price-low-high') {
    sortOption = { price: 1 };
  }

  const result = await productServices.getAllProductsFromDB(filter, sortOption);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All products retrieved successfully',
    data: result,
  });
});

const getASingleProductBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;

  const result = await productServices.getASingleProductBySlugFromDB(slug);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'The product has retrieved successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productServices.deleteProductFromDB(id);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const productControllers = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getASingleProductBySlug,
};
