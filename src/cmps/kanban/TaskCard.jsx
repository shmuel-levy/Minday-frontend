import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { UserAvatar } from '../UserAvatar';

export function TaskCard({ 
  task, 
  index, 
  onUpdateTask, 
  onOpenTaskDetails,
  board 
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title || '');

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

  function handleTitleSave() {
    if (editTitle !== task.title && onUpdateTask && board) {
      // Find the group containing this task
      const groupIdx = board.groups.findIndex(group => group.id === task.groupId);
      if (groupIdx !== -1) {
        const group = board.groups[groupIdx];
        const taskIdx = group.tasks.findIndex(t => t.id === task.id);
        if (taskIdx !== -1) {
          // Create updated group and board
          const updatedTask = { ...task, title: editTitle };
          const updatedTasks = [...group.tasks];
          updatedTasks[taskIdx] = updatedTask;
          const updatedGroup = { ...group, tasks: updatedTasks };
          const updatedGroups = [...board.groups];
          updatedGroups[groupIdx] = updatedGroup;
          const updatedBoard = { ...board, groups: updatedGroups };
          onUpdateTask(updatedBoard);
        }
      }
    }
    setIsEditingTitle(false);
  }

  function handleTitleKeyDown(e) {
    if (e.key === 'Enter') {
      handleTitleSave();
    }
    if (e.key === 'Escape') {
      setEditTitle(task.title || '');
      setIsEditingTitle(false);
    }
  }

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
            {isEditingTitle ? (
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
                className="task-title-input"
                autoFocus
              />
            ) : (
              <h4
                className="task-title"
                onClick={e => {
                  e.stopPropagation();
                  setIsEditingTitle(true);
                }}
                style={{ cursor: 'text' }}
              >
                {task.title}
              </h4>
            )}
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