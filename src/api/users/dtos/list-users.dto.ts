import { zodPaginationValidationSchema } from 'src/common/validation/zod/common-schemas';
import { zodCreateDateValidator, zodCreateStringValidator } from 'src/common/validation/zod/validator-functions';
import { z } from 'zod';
import { zodStringToStringArrayPreprocessor } from 'src/common/validation/zod/preprocessors';

export const listUsersValidationSchema = z
  .object(
    {
      ids: z
        .preprocess(zodStringToStringArrayPreprocessor, z.array(zodCreateStringValidator('Id', { isUUID: true })))
        .optional(),
      excludedIds: z
        .preprocess(zodStringToStringArrayPreprocessor, z.array(zodCreateStringValidator('Id', { isUUID: true })))
        .optional(),
      createdAtStart: zodCreateDateValidator('Created at start').optional(),
      createdAtEnd: zodCreateDateValidator('Created at end').optional(),
      updatedAtStart: zodCreateDateValidator('Updated at start').optional(),
      updatedAtEnd: zodCreateDateValidator('Updated at end').optional(),
      createdBy: z
        .preprocess(zodStringToStringArrayPreprocessor, z.array(zodCreateStringValidator('Id', { isUUID: true })))
        .optional(),
      excludeCreatedBy: z
        .preprocess(zodStringToStringArrayPreprocessor, z.array(zodCreateStringValidator('Id', { isUUID: true })))
        .optional(),
    },
    {
      invalid_type_error: 'List users data must be an object',
      required_error: 'List users data is required',
    },
  )
  .and(zodPaginationValidationSchema);
export type ListUsersDto = z.infer<typeof listUsersValidationSchema>;
