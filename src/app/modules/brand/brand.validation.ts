import { z } from 'zod';

const brandValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Brand name is required',
        invalid_type_error: 'Brand name must be a string',
      })
      .trim(),
  }),
});

export const brandValidations = {
  brandValidationSchema,
};
