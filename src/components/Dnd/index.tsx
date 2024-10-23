import {DragDropContext, Droppable,  DragDropContextProps} from '@hello-pangea/dnd'

export const DndContext = ({onDragEnd, children}:{
  onDragEnd: DragDropContextProps['onDragEnd'],
  children: React.ReactNode
}) => {  

  return (
    <DragDropContext onDragEnd={onDragEnd} >
    <Droppable droppableId='droppable'>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='flex flex-col gap-5'
        >
          {children}
        
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
  )
}