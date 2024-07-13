import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import slugify from 'slugify';

const createCategoryIntoDB = async (payload: TCategory) => {
  // checking if the category is already exists
  const alreadyExists = await Category.findOne({
    name: payload.name,
  });

  if (alreadyExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'This category already exists');

  const createdCategory = {
    name: payload.name,
    slug: slugify(payload.name, { lower: true, trim: true }),
  };

  const category = await Category.create(createdCategory);

  if (!category) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not create the category');
  }

  return category;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Category.find();

  if (!categories)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not find the categories');

  return categories;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
