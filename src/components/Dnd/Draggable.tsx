import {Draggable} from '@hello-pangea/dnd'

const grid = 8


interface DraggableStyle {
  [key: string]: string | number
}
export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggableStyle
): DraggableStyle => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
})

export const DndDraggable = ({id, index, children}:{
  id: string,
  index: number
  children: React.ReactNode
}) => {  

  return (
    <Draggable
    key={id}
    draggableId={id}
    index={index}
    
  >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style as never
        )}
      >
          {children}
      </div>

   
  )}
  </Draggable>
  )
}