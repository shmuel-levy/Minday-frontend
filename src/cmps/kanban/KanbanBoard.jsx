import React, { useMemo } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { KanbanColumn } from './KanbanColumn';
import { useBoardState } from '../../customHooks/useBoardState';

export function KanbanBoard({ 
  board, 
  onUpdateTask, 
  onOpenTaskDetails 
}) {
  const { handleUpdateTask } = useBoardState(board);

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

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // Drop outside the list
    if (!destination) return;

    // Same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the task being moved
    const sourceColumnId = source.droppableId;
    const task = tasksByStatus[sourceColumnId][source.index];
    
    if (!task) return;

    // Find the new status based on destination column
    const destinationColumn = statusColumns.find(col => col.id === destination.droppableId);
    const newStatus = destinationColumn ? destinationColumn.status : 'Not Started';

    // Update the task status
    const updatedTask = {
      ...task,
      status: newStatus
    };

    try {
      await handleUpdateTask(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!board) {
    return <div className="kanban-loading">Loading board...</div>;
  }

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-columns">
          {statusColumns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByStatus[column.id] || []}
              onUpdateTask={onUpdateTask}
              onOpenTaskDetails={onOpenTaskDetails}
              board={board}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
} 