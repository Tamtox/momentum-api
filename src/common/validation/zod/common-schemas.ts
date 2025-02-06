import { z } from 'zod';
import { zodCreateNumberValidator } from './validator-functions';
import { zodStringToNumberPreprocessor } from './preprocessors';

export const zodPaginationValidationSchema = z.object({
  page: z.preprocess(zodStringToNumberPreprocessor, zodCreateNumberValidator('Page', { min: 1 })),
  pageSize: z.preprocess(zodStringToNumberPreprocessor, zodCreateNumberValidator('Page size', { min: 1 })),
});
