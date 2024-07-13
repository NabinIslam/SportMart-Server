import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidations } from './category.validation';
import { categoryControllers } from './category.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidations.categoryValidationSchema),
  categoryControllers.createCategory,
);

router.get('/', categoryControllers.getAllCategories);

// router.put(
//   '/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(bikeValidations.updateBikeValidationSchema),
//   bikeControllers.updateBike,
// );

// router.delete('/:id', auth(USER_ROLE.admin), bikeControllers.deleteBike);

export const categoryRoutes = router;
