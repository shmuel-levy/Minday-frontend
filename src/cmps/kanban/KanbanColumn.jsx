import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskCard } from './TaskCard';

export function KanbanColumn({ 
  column, 
  tasks, 
  onUpdateTask, 
  onOpenTaskDetails,
  board 
}) {
  return (
    <div className={`kanban-column ${column.className || ''}`}>
      <div className="kanban-column-header">
        <div className="kanban-column-title">
          <span className="title-column">{column.title}</span>
          <span className="kanban-column-count">{tasks.length}</span>
        </div>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`kanban-column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onUpdateTask={onUpdateTask}
                onOpenTaskDetails={onOpenTaskDetails}
                board={board}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
} 