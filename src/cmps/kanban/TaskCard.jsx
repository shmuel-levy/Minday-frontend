import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { UserAvatar } from '../UserAvatar';

export function TaskCard({ 
  task, 
  index, 
  onUpdateTask, 
  onOpenTaskDetails,
  board 
}) {
  const getStatusColor = (status) => {
    const statusColors = {
      'Not Started': '#c4c4c4',
      'Working on it': '#fdab3d',
      'Stuck': '#e2445c',
      'Done': '#00c875'
    };
    return statusColors[status] || '#c4c4c4';
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      'Low': '#00c875',
      'Medium': '#fdab3d',
      'High': '#e2445c',
      'Critical ⚠️': '#ff3b30'
    };
    return priorityColors[priority] || '#c4c4c4';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleCardClick = () => {
    if (onOpenTaskDetails) {
      onOpenTaskDetails(task.id, board);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
          onClick={handleCardClick}
        >
          <div className="task-card-header">
            <h4 className="task-title">{task.title}</h4>
            {task.isChecked && (
              <span className="task-checked">✓</span>
            )}
          </div>

          <div className="task-card-content">
            {task.status && (
              <div className="task-status">
                <span 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(task.status) }}
                ></span>
                <span className="status-text">{task.status}</span>
              </div>
            )}

            {task.priority && (
              <div className="task-priority">
                <span 
                  className="priority-indicator"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                ></span>
                <span className="priority-text">{task.priority}</span>
              </div>
            )}

            {task.dueDate && (
              <div className="task-due-date">
                📅 {formatDate(task.dueDate)}
              </div>
            )}

            {task.assignee && (
              <div className="task-assignee">
                <UserAvatar 
                  user={{ 
                    fullname: task.assignee, 
                    imgUrl: task.assigneeImgUrl 
                  }} 
                  className="small-avatar"
                />
                <span className="assignee-name">{task.assignee}</span>
              </div>
            )}

            {task.files && task.files.length > 0 && (
              <div className="task-files">
                📎 {task.files.length} file{task.files.length > 1 ? 's' : ''}
              </div>
            )}

            {task.updates && task.updates.length > 0 && (
              <div className="task-updates">
                💬 {task.updates.length} update{task.updates.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
} 