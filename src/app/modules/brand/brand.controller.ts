import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { brandServices } from './brand.service';

const createBrand = catchAsync(async (req, res) => {
  const result = await brandServices.createBrandIntoDB(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand added successfully',
    data: result,
  });
});

const getAllBrands = catchAsync(async (req, res) => {
  const result = await brandServices.getAllBrandsFromDB();

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brands retrieved successfully',
    data: result,
  });
});

export const brandControllers = {
  createBrand,
  getAllBrands,
};
