import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productControllers } from './product.controller';
import { productValidations } from './product.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(productValidations.productValidationSchema),
  productControllers.createProduct,
);

router.get('/', productControllers.getAllProducts);

// router.put(
//   '/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(bikeValidations.updateBikeValidationSchema),
//   bikeControllers.updateBike,
// );

router.get('/slug/:slug', productControllers.getASingleProductBySlug);

router.delete('/:id', productControllers.deleteProduct);

export const productRoutes = router;
