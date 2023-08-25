import { z } from 'nestjs-zod/z';

export const StringBooleanSchema = z.union([z.string(),z.boolean()]).optional().default(false).transform(bool=>{
  return (bool === 'true' || bool === true) ? true : false;
});

export const StringIntNumberSchema = z
  .union([
    z.string().regex(/^-?[0-9]+$/, {
      message: 'Must be a valid integer: /^-?[0-9]+$/',
    }),
    z.number(),
  ])
  .transform((val) => parseInt(val.toString()));

export const StringFloatNumberSchema = z
  .union([
    z.string().regex(/^-?[0-9]+(\.[0-9]+)?$/, {
      message: 'Must be a valid float: /^-?[0-9]+(.[0-9]+)?$/',
    }),
    z.number(),
  ])
  .transform((val) => parseFloat(val.toString()));