import { TImageItemSchema } from "./SectionImage/schema"
import { TTextItemSchema } from "./SectionText/schema"


export const reorder = (
  list: (TTextItemSchema | TImageItemSchema)[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}