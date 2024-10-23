import {  z as zod } from 'zod'
export const TextItemSchema = zod.object({
  type: zod.literal('text'),
  content: zod.string({
    required_error: 'O campo é obrigatório.',
  }).refine((v) => !!v, 'O campo text é obrigatório.')
});

export type TTextItemSchema = zod.infer<typeof TextItemSchema>
