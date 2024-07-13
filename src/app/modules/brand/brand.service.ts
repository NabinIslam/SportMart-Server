import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import slugify from 'slugify';
import { TBrand } from './brand.interface';
import { Brand } from './brand.model';

const createBrandIntoDB = async (payload: TBrand) => {
  // checking if the category is already exists
  const alreadyExists = await Brand.findOne({
    name: payload.name,
  });

  if (alreadyExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'This brand already exists');

  const createdBrand = {
    name: payload.name,
    slug: slugify(payload.name, { lower: true, trim: true }),
  };

  const brand = await Brand.create(createdBrand);

  if (!brand) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not create the brand');
  }

  return brand;
};

const getAllBrandsFromDB = async () => {
  const brands = await Brand.find();

  if (!brands)
    throw new AppError(httpStatus.NOT_FOUND, 'Could not find the brands');

  return brands;
};

export const brandServices = {
  createBrandIntoDB,
  getAllBrandsFromDB,
};
