'use client'
import {Controller, useFieldArray, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {PocSchema, TPocSchema} from './schema'
import {TTextItemSchema} from './_feature/SectionText/schema'
import {TImageItemSchema} from './_feature/SectionImage/schema'
import { reorder} from './_feature/utils'
import {DndContext} from '@/components/Dnd'
import {DndDraggable} from '@/components/Dnd/Draggable'

type TResult = {
  destination: {index: number} | null
  source: {index: number}
}

export const DragInDrop = () => {
  const form = useForm<TPocSchema>({
    resolver: zodResolver(PocSchema),
  })

  const {fields, append, remove, replace} = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const onDragEnd = async (result: TResult) => {
    if (!result.destination) {
      return
    }

    const itemsArray = reorder(
      form.watch('items') as (TTextItemSchema | TImageItemSchema)[],
      result.source.index,
      result.destination.index
    )

    replace(itemsArray)
    await form.trigger()
  }

  const handleFormSubmit = (data: TPocSchema) => {
    console.log(data)
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex gap-7 my-4'>
        <button
          className='h-20 w-20 bg-slate-500'
          onClick={() => append({type: 'text', content: ''})}
        >
          Text
        </button>
        <button
          className='h-20 w-20 bg-slate-500'
          onClick={() => append({type: 'image', url: '', alt: ''})}
        >
          Image
        </button>
      </div>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className=' container w-full'
      >
        <DndContext onDragEnd={onDragEnd}>
          {fields.map((item, index) => {
            return (
              <DndDraggable
                key={item.id}
                id={item.id}
                index={index}
              >
                <button onClick={() => remove(index)}>Remove</button>

                {item.type === 'text' && (
                  <Controller
                    name={`items.${index}.content`}
                    control={form.control}
                    render={({field, fieldState}) => (
                      <div className='grid grid-cols-1'>
                        <label className='grid grid-cols-1'>
                          Titulo
                          <input
                            {...field}
                            placeholder='Content'
                            className=' text-black'
                          />
                        </label>
                        <p className='text-red-500'>
                          {fieldState.error?.message || ''}
                        </p>
                      </div>
                    )}
                  />
                )}
                {item.type === 'image' && (
                  <div>
                    <div>
                      <Controller
                        name={`items.${index}.url`}
                        control={form.control}
                        render={({field, fieldState}) => (
                          <div className='grid grid-cols-1 gap-4'>
                            <div className='bg-red-500 w-[64px] h-[64px]'>
                              <img
                                src={form.watch(`items.${index}.url`)}
                                alt=''
                                className='w-[64px] h-[64px]'
                              />
                            </div>
                            <label className='grid grid-cols-1'>
                              Image
                              <input
                                {...field}
                                placeholder='URL'
                                className=' text-black'
                              />
                            </label>
                            <p className='text-red-500'>
                              {fieldState.error?.message || ''}
                            </p>
                          </div>
                        )}
                      />
                      <Controller
                        name={`items.${index}.alt`}
                        control={form.control}
                        render={({field, fieldState}) => (
                          <div>
                            <label className='grid grid-cols-1'>
                              Texto Alternativo
                              <input
                                {...field}
                                placeholder='Image Alt'
                                className=' text-black'
                              />
                            </label>
                            <p className='text-red-500'>
                              {fieldState.error?.message || ''}
                            </p>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                )}
              </DndDraggable>
            )
          })}
        </DndContext>

        <button
          type='submit'
          className='bg-slate-500 text-white p-2 rounded-md'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
