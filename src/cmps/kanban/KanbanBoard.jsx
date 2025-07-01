import React, { useMemo, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { KanbanColumn } from './KanbanColumn';
import { useBoardState } from '../../customHooks/useBoardState';

export function KanbanBoard({ 
  board, 
  onUpdateTask, 
  onOpenTaskDetails 
}) {
  const { handleUpdateTask, handleKanbanDragEnd } = useBoardState(board);

  // Persisted column order (from board or fallback)
  const defaultOrder = ['not-started', 'working-on-it', 'stuck', 'done'];
  const [columnOrder, setColumnOrder] = useState(
    (board && board.kanbanColumnOrder) || defaultOrder
  );

  useEffect(() => {
    if (board && board.kanbanColumnOrder) {
      setColumnOrder(board.kanbanColumnOrder);
    }
  }, [board]);

  // Define status columns for Kanban view
  const statusColumns = useMemo(() => [
    { id: 'not-started', title: 'Not Started', status: 'Not Started', className: 'status-not-started' },
    { id: 'working-on-it', title: 'Working on it', status: 'Working on it', className: 'status-working-on-it' },
    { id: 'stuck', title: 'Stuck', status: 'Stuck', className: 'status-stuck' },
    { id: 'done', title: 'Done', status: 'Done', className: 'status-done' }
  ], []);

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    const grouped = {};
    statusColumns.forEach(column => {
      grouped[column.id] = [];
    });

    if (board && board.groups) {
      board.groups.forEach(group => {
        group.tasks.forEach(task => {
          const status = task.status || 'Not Started';
          const columnId = statusColumns.find(col => col.status === status)?.id || 'not-started';
          grouped[columnId].push({
            ...task,
            groupId: group.id,
            groupTitle: group.title
          });
        });
      });
    }

    return grouped;
  }, [board, statusColumns]);

  const handleDragEnd = (result) => {
    if (result.type === 'COLUMN') {
      const { source, destination } = result;
      if (!destination) return;
      const newOrder = Array.from(columnOrder);
      const [removed] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, removed);
      setColumnOrder(newOrder);
      // Persist to board and storage
      if (onUpdateTask && board) {
        const updatedBoard = { ...board, kanbanColumnOrder: newOrder };
        onUpdateTask(updatedBoard);
      }
      return;
    }
    handleKanbanDragEnd(result);
  };

  if (!board) {
    return <div className="kanban-loading">Loading board...</div>;
  }

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="kanban-columns" direction="horizontal" type="COLUMN">
          {(provided, snapshot) => (
            <div
              className="kanban-columns"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columnOrder.map((columnId, index) => {
                const column = statusColumns.find(col => col.id === columnId);
                if (!column) return null;
                return (
                  <Draggable key={column.id} draggableId={column.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="kanban-column-draggable"
                      >
                        <KanbanColumn
                          column={column}
                          tasks={tasksByStatus[column.id] || []}
                          onUpdateTask={onUpdateTask}
                          onOpenTaskDetails={onOpenTaskDetails}
                          board={board}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
} 