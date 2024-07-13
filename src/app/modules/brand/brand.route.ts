import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { brandValidations } from './brand.validation';
import { brandControllers } from './brand.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(brandValidations.brandValidationSchema),
  brandControllers.createBrand,
);

router.get('/', brandControllers.getAllBrands);

// router.put(
//   '/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(bikeValidations.updateBikeValidationSchema),
//   bikeControllers.updateBike,
// );

// router.delete('/:id', auth(USER_ROLE.admin), bikeControllers.deleteBike);

export const brandRoutes = router;
