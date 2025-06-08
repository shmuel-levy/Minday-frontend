import { useState } from "react";

export function useTaskSelection(demoBoard, setDemoBoard) {
  const [selectedTasks, setSelectedTasks] = useState([]);

  function handleTaskSelection(taskId, groupId, isSelected) {
    setSelectedTasks((prev) => {
      const newSelection = [...prev];
      const groupIndex = newSelection.findIndex(
        (group) => group.groupId === groupId
      );

      if (isSelected) {
        if (groupIndex >= 0) {
          if (!newSelection[groupIndex].taskIds.includes(taskId)) {
            newSelection[groupIndex].taskIds.push(taskId);
          }
        } else {
          newSelection.push({ groupId, taskIds: [taskId] });
        }
      } else {
        if (groupIndex >= 0) {
          newSelection[groupIndex].taskIds = newSelection[
            groupIndex
          ].taskIds.filter((id) => id !== taskId);
          if (newSelection[groupIndex].taskIds.length === 0) {
            newSelection.splice(groupIndex, 1);
          }
        }
      }

      return newSelection;
    });
  }

  function toggleAllInGroup(groupId, isChecked) {
    const group = demoBoard.groups.find((g) => g.id === groupId);
    if (!group) return;

    const updatedGroups = demoBoard.groups.map((g) =>
      g.id === groupId
        ? { ...g, tasks: g.tasks.map((task) => ({ ...task, isChecked })) }
        : g
    );
    setDemoBoard({ ...demoBoard, groups: updatedGroups });

    if (isChecked) {
      const taskIds = group.tasks.map((task) => task.id);
      setSelectedTasks((prev) => {
        const newSelection = prev.filter((sg) => sg.groupId !== groupId);
        newSelection.push({ groupId, taskIds });
        return newSelection;
      });
    } else {
      setSelectedTasks((prev) => prev.filter((sg) => sg.groupId !== groupId));
    }
  }

  function areAllTasksSelected(groupId) {
    const group = demoBoard.groups.find((g) => g.id === groupId);
    if (!group || group.tasks.length === 0) return false;

    const selectedGroup = selectedTasks.find((sg) => sg.groupId === groupId);
    if (!selectedGroup) return false;

    return selectedGroup.taskIds.length === group.tasks.length;
  }

  function handleDuplicateSelected() {
    const updatedGroups = [...demoBoard.groups];

    selectedTasks.forEach((selectedGroup) => {
      const groupIndex = updatedGroups.findIndex(
        (g) => g.id === selectedGroup.groupId
      );
      if (groupIndex >= 0) {
        const group = updatedGroups[groupIndex];
        const tasksToAdd = [];

        selectedGroup.taskIds.forEach((taskId) => {
          const task = group.tasks.find((t) => t.id === taskId);
          if (task) {
            const duplicatedTask = {
              ...task,
              id: `t${Date.now()}-${Math.random()}`,
              title: `${task.title} (copy)`,
            };
            tasksToAdd.push(duplicatedTask);
          }
        });

        updatedGroups[groupIndex].tasks.push(...tasksToAdd);
      }
    });

    setDemoBoard({ ...demoBoard, groups: updatedGroups });
    setSelectedTasks([]);
  }

  function handleDeleteSelected() {
    const updatedGroups = demoBoard.groups.map((group) => {
      const selectedGroup = selectedTasks.find((sg) => sg.groupId === group.id);
      if (selectedGroup) {
        return {
          ...group,
          tasks: group.tasks.filter(
            (task) => !selectedGroup.taskIds.includes(task.id)
          ),
        };
      }
      return group;
    });

    setDemoBoard({ ...demoBoard, groups: updatedGroups });
    setSelectedTasks([]);
  }

  function handleMoveSelectedToGroup(targetGroupId) {
    const updatedGroups = [...demoBoard.groups];
    const tasksToMove = [];

    selectedTasks.forEach((selectedGroup) => {
      const sourceGroupIndex = updatedGroups.findIndex(
        (g) => g.id === selectedGroup.groupId
      );
      if (sourceGroupIndex >= 0) {
        const sourceGroup = updatedGroups[sourceGroupIndex];

        selectedGroup.taskIds.forEach((taskId) => {
          const taskIndex = sourceGroup.tasks.findIndex((t) => t.id === taskId);
          if (taskIndex >= 0) {
            tasksToMove.push(sourceGroup.tasks[taskIndex]);
            sourceGroup.tasks.splice(taskIndex, 1);
          }
        });
      }
    });

    const targetGroupIndex = updatedGroups.findIndex(
      (g) => g.id === targetGroupId
    );
    if (targetGroupIndex >= 0) {
      updatedGroups[targetGroupIndex].tasks.push(...tasksToMove);
    }

    setDemoBoard({ ...demoBoard, groups: updatedGroups });
    setSelectedTasks([]);
  }

  function handleClearSelection() {
    setSelectedTasks([]);
  }


  function cleanupSelections(groupId) {
    setSelectedTasks((prev) => prev.filter((sg) => sg.groupId !== groupId));
  }

  return {
    selectedTasks,
    handleTaskSelection,
    toggleAllInGroup,
    areAllTasksSelected,
    handleDuplicateSelected,
    handleDeleteSelected,
    handleMoveSelectedToGroup,
    handleClearSelection,
    cleanupSelections,
  };
}