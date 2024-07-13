import { z } from 'zod';

const categoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Category name is required',
        invalid_type_error: 'Category name must be a string',
      })
      .trim(),
  }),
});

export const categoryValidations = {
  categoryValidationSchema,
};
