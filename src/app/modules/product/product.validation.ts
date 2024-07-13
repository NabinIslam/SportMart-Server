import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Product name is required',
        invalid_type_error: 'Product name must be a string',
      })
      .trim(),

    description: z
      .string({
        required_error: 'Product description is required',
        invalid_type_error: 'Product description must be a string',
      })
      .trim(),

    category: z
      .string({
        required_error: 'Category ID is required',
        invalid_type_error: 'Category ID must be a string',
      })
      .trim(),

    brand: z
      .string({
        required_error: 'Brand ID is required',
        invalid_type_error: 'Brand ID must be a string',
      })
      .trim(),

    stockQuantity: z.number({
      required_error: 'Stock quantity is required',
      invalid_type_error: 'Stock quantity must be a number',
    }),

    rating: z
      .number({
        required_error: 'Product rating is required',
        invalid_type_error: 'Product rating must be a number',
      })
      .min(1, { message: 'Product rating must be at least 1 digits' })
      .max(5, { message: 'Product rating can not be greater than 5 digits' }),

    price: z
      .number({
        required_error: 'Product price is required',
        invalid_type_error: 'Product price must be a number',
      })
      .min(2, { message: 'Product rating must be at least 2 digits' }),

    image: z
      .string({
        required_error: 'Product image is required',
        invalid_type_error: 'Product image must be a string',
      })
      .trim(),
  }),
});

export const productValidations = {
  productValidationSchema,
};
