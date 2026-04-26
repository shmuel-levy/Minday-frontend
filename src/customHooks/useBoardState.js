import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getRandomColor } from "../services/util.service";
import { loadBoard, updateBoard, removeBoard as removeBoardAction, saveDashboardWidgets } from "../store/board.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { boardService } from "../services/board";

export function useBoardState(board, onAddNewTask) {
  const currentBoard =
    board || useSelector((storeState) => storeState.boardModule.board);

  const [taskDrafts, setTaskDrafts] = useState({});
  const [focusTaskId, setFocusTaskId] = useState(null);
  const [dashboardWidgets, setDashboardWidgets] = useState([]);
  const isSavingRef = useRef(false);

  useEffect(() => {
    if (currentBoard?._id && !isSavingRef.current) {
      const savedWidgets = currentBoard.dashboardWidgets || [];
      // Only update if the widgets are actually different
      const currentWidgetsString = JSON.stringify(dashboardWidgets);
      const savedWidgetsString = JSON.stringify(savedWidgets);
      if (currentWidgetsString !== savedWidgetsString) {
        console.log('Loading widgets from board:', savedWidgets);
        setDashboardWidgets(savedWidgets);
      }
    }
  }, [currentBoard?._id, currentBoard?.dashboardWidgets]);

  useEffect(() => {
    if (!currentBoard?._id || dashboardWidgets.length === 0) return;
    
    // Don't save if the widgets are the same as what's already in the board
    const currentBoardWidgets = currentBoard?.dashboardWidgets || [];
    const currentWidgetsString = JSON.stringify(dashboardWidgets);
    const boardWidgetsString = JSON.stringify(currentBoardWidgets);
    if (currentWidgetsString === boardWidgetsString) {
      return;
    }
    
    const timeoutId = setTimeout(async () => {
      try {
        console.log('Saving dashboard widgets:', dashboardWidgets);
        isSavingRef.current = true;
        await saveDashboardWidgets(currentBoard._id, dashboardWidgets);
        console.log('Successfully saved dashboard widgets');
      } catch (error) {
        console.error('Error saving dashboard widgets:', error);
      } finally {
        isSavingRef.current = false;
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [dashboardWidgets, currentBoard?._id, currentBoard?.dashboardWidgets]);

  function handleAddNewTask() {
    let updatedBoard = { ...board };

    if (!updatedBoard.groups?.length) {
      updatedBoard.groups = [
        {
          id: `g${Date.now()}`,
          title: "New Group",
          color: getRandomColor(),
          isCollapsed: false,
          tasks: [],
        },
      ];
    }

    const newTask = {
      id: `t${Date.now()}`,
      title: "New task",
      assignee: "",
      status: "Not Started",
      dueDate: "",
      timeline: {
        startDate: "",
        endDate: ""
      },
      priority: "Medium",
      isChecked: false,
      updates: [],
      files: [],
    };

    updatedBoard.groups[0].tasks = [newTask, ...updatedBoard.groups[0].tasks];

    updateBoard(updatedBoard);
    setFocusTaskId(newTask.id);

    if (onAddNewTask) onAddNewTask(newTask, updatedBoard.groups[0].id);
  }

  function handleAdd(groupId) {
    const title = (taskDrafts[groupId] || "").trim();
    if (!title) return;

    const newTask = {
      id: `t${Date.now()}`,
      title,
      assignee: "",
      status: "Not Started",
      dueDate: "",
      timeline: {
        startDate: "",
        endDate: ""
      },
      priority: "",
      updates: [],
      files: [],
    };

    const updatedGroups = board.groups.map((group) =>
      group.id === groupId
        ? { ...group, tasks: [...group.tasks, newTask] }
        : group
    );

    updateBoard({ ...board, groups: updatedGroups });
    setTaskDrafts((prev) => ({ ...prev, [groupId]: "" }));
  }

  function handleUpdateTask(updatedTask) {
    try {
      const updatedGroups = board.groups.map(group => ({
        ...group,
        tasks: group.tasks.map(taskItem => 
          taskItem.id === updatedTask.id 
            ? { ...taskItem, ...updatedTask }
            : taskItem
        )
      }));

      const updatedBoard = { ...board, groups: updatedGroups };

      // Use the same pattern as other functions
      updateBoard(updatedBoard);
      
      showSuccessMsg("Task updated successfully");
      
    } catch (err) {
      console.error("Error updating task:", err);
      showErrorMsg("Cannot update task");
    }
  }

  function handleAddGroup() {
    const newGroup = {
      id: `g${Date.now()}`,
      title: "New Group",
      color: getRandomColor(),
      isCollapsed: false,
      tasks: [],
    };
    updateBoard({ ...board, groups: [...board.groups, newGroup] });
  }

  function handleAddGroupAtTop() {
    const newGroup = {
      id: `g${Date.now()}`,
      title: "New Group",
      color: getRandomColor(),
      isCollapsed: false,
      tasks: [],
    };
    updateBoard({ ...board, groups: [newGroup, ...board.groups] });
  }

  function handleDeleteGroup(groupId) {
    const updatedGroups = board.groups.filter(
      (group) => group.id !== groupId
    );
    updateBoard({ ...board, groups: updatedGroups });
  }

  function handleToggleCollapse(groupId) {
    const updatedGroups = board.groups.map((group) =>
      group.id === groupId
        ? { ...group, isCollapsed: !group.isCollapsed }
        : group
    );
    updateBoard({ ...board, groups: updatedGroups });
  }

  function handleDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;

    const srcGroupIdx = board.groups.findIndex(
      (g) => g.id === source.droppableId
    );
    const destGroupIdx = board.groups.findIndex(
      (g) => g.id === destination.droppableId
    );
    if (srcGroupIdx === -1 || destGroupIdx === -1) return;

    const srcGroup = board.groups[srcGroupIdx];
    const destGroup = board.groups[destGroupIdx];

    const [movedTask] = srcGroup.tasks.splice(source.index, 1);
    destGroup.tasks.splice(destination.index, 0, movedTask);

    const updatedGroups = [...board.groups];
    updatedGroups[srcGroupIdx] = { ...srcGroup };
    updatedGroups[destGroupIdx] = { ...destGroup };

    updateBoard({ ...board, groups: updatedGroups });
  }

  function handleKanbanDragEnd(result) {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    try {
      const task = board.groups
        .flatMap(group => group.tasks)
        .find(task => task.id === draggableId);
      
      if (!task) {
        console.error('Task not found:', draggableId);
        return;
      }

      const statusMap = {
        'not-started': 'Not Started',
        'working-on-it': 'Working on it',
        'stuck': 'Stuck',
        'done': 'Done'
      };

      const newStatus = statusMap[destination.droppableId] || 'Not Started';

      const updatedGroups = board.groups.map(group => ({
        ...group,
        tasks: group.tasks.map(taskItem => 
          taskItem.id === draggableId 
            ? { ...taskItem, status: newStatus }
            : taskItem
        )
      }));

      const updatedBoard = { ...board, groups: updatedGroups };

      updateBoard(updatedBoard);
      
      showSuccessMsg("Task moved successfully");
      
    } catch (error) {
      console.error('Error in Kanban drag-and-drop:', error);
      showErrorMsg('Failed to update task position');
    }
  }

  async function handleRemoveBoard(boardId) {
    try {
      await removeBoardAction(boardId);
      showSuccessMsg("Board removed successfully");
    } catch (err) {
      showErrorMsg("Failed to remove board");
    }
  }

  function handleAddWidget(widgetType) {
    console.log('handleAddWidget called with:', widgetType);
    let widgetTypeKey = 'chart'; 
    let defaultWidth = 8;
    let defaultHeight = 8;
    
    if (widgetType === 'Numbers') {
      widgetTypeKey = 'numbers';
      defaultWidth = 8;
      defaultHeight = 8;
    } else if (widgetType === 'Battery') {
      widgetTypeKey = 'battery';
      defaultWidth = 8;
      defaultHeight = 8;
    } else if (widgetType === 'Chart') {
      widgetTypeKey = 'chart';
      defaultWidth = 8;
      defaultHeight = 8;
    } else if (widgetType === 'Files Gallery') {
      widgetTypeKey = 'files-gallery';
      defaultWidth = 10;
      defaultHeight = 10;
    }
    
    const newWidget = {
      id: 'w' + Date.now(),
      type: widgetTypeKey,
      title: widgetType,
      x: (dashboardWidgets.length * 2) % 12,
      y: Math.floor(dashboardWidgets.length / 2) * 4,
      w: defaultWidth,
      h: defaultHeight,
    };
    console.log('Adding new widget:', newWidget);
    setDashboardWidgets(prev => [...prev, newWidget]);
  }

  function handleUpdateWidgets(widgets) {
    setDashboardWidgets(widgets);
  }

  function handleRemoveWidget(widgetId) {
    setDashboardWidgets(prev => prev.filter(w => w.id !== widgetId));
  }

  return {
    board,
    updateBoard,
    taskDrafts,
    setTaskDrafts,
    focusTaskId,
    setFocusTaskId,
    dashboardWidgets,
    setDashboardWidgets,
    handleAddNewTask,
    handleAdd,
    handleUpdateTask,
    handleAddGroup,
    handleAddGroupAtTop,
    handleDeleteGroup,
    handleToggleCollapse,
    handleDragEnd,
    handleKanbanDragEnd,
    handleRemoveBoard,
    handleAddWidget,
    handleUpdateWidgets,
    handleRemoveWidget,
  };
}