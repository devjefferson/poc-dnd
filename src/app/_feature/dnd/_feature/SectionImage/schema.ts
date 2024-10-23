import {  z as zod } from 'zod'

export const ImageItemSchema = zod.object({
  type: zod.literal('image'),
  url: zod.string({
    required_error: 'O campo é obrigatório.',
  }).refine((v) => !!v, 'O campo url é obrigatório.'),
  alt: zod.string({
    required_error: 'O campo é obrigatório.',
  }).refine((v) => !!v, 'O campo Alt é obrigatório.')
});

export type TImageItemSchema= zod.infer<typeof ImageItemSchema> 