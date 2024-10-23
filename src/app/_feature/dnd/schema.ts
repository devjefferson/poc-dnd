import { ImageItemSchema } from './_feature/SectionImage/schema';
import { TextItemSchema } from './_feature/SectionText/schema';
import {  z as zod } from 'zod'

export const PocSchema = zod.object({
  items: zod.array(zod.discriminatedUnion('type', [TextItemSchema, ImageItemSchema]))
})

export type TPocSchema = zod.infer<typeof PocSchema>
