import { useState } from "react";
import { useSelector } from "react-redux";
import { getRandomColor } from "../services/util.service";

export function useBoardState(board, onAddNewTask) {
  const currentBoard =
    board || useSelector((storeState) => storeState.boardModule.board);

  const [demoBoard, setDemoBoard] = useState(() =>
    currentBoard?.groups?.length
      ? currentBoard
      : {
          ...currentBoard,
          title: currentBoard?.title || "Monday - Sprint 4 - Design Approval",
          groups: [
            {
              id: "g1",
              title: "Frontend",
              color: getRandomColor(),
              isCollapsed: false,
              tasks: [
                {
                  id: "t1",
                  title: "Implement Task Preview UI 2",
                  status: "Working on it",
                  assignee: "John",
                  dueDate: "May 26",
                  isChecked: false,
                  updates: [],
                  files: [],
                },
                {
                  id: "t2",
                  title: "Build Board List component",
                  status: "Done",
                  assignee: "SS",
                  dueDate: "May 25",
                  isChecked: false,
                  updates: [],
                  files: [],
                },
                {
                  id: "t3",
                  title: "Create Task Details modal",
                  status: "Stuck",
                  assignee: "Mike",
                  dueDate: "May 27",
                  isChecked: false,
                  updates: [],
                  files: [],
                },
                {
                  id: "t4",
                  title: "Add drag & drop for tasks",
                  status: "Working on it",
                  assignee: "SS",
                  dueDate: "May 28",
                  isChecked: false,
                  updates: [],
                  files: [],
                },
              ],
            },
            {
              id: "g2",
              title: "Backend",
              color: getRandomColor(),
              isCollapsed: false,
              tasks: [
                {
                  id: "t5",
                  title: "Set up Express server",
                  status: "Working on it",
                  assignee: "SS",
                  dueDate: "May 30",
                  isChecked: false,
                  updates: [],
                  files: [],
                },
                {
                  id: "t6",
                  title: "Create MongoDB schema files",
                  status: "Working on it",
                  assignee: "John",
                  dueDate: "May 30",
                  isChecked: false,
                  updates: [],
                  files: [],
                },
                {
                  id: "t7",
                  title: "Build Login & Signup pages",
                  status: "Working on it",
                  assignee: "Mike",
                  dueDate: "May 31",
                  isChecked: false,
                  updates: [],
                  files: [],
                },
              ],
            },
          ],
        }
  );

  const [taskDrafts, setTaskDrafts] = useState({});
  const [focusTaskId, setFocusTaskId] = useState(null);

  function handleAddNewTask() {
    let updatedBoard = { ...demoBoard };

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
      status: "Not Started",
      assignee: "",
      dueDate: "",
      isChecked: false,
      updates: [],
      files: [],
    };

    updatedBoard.groups[0].tasks = [newTask, ...updatedBoard.groups[0].tasks];

    setDemoBoard(updatedBoard);
    setFocusTaskId(newTask.id);

    if (onAddNewTask) onAddNewTask(newTask, updatedBoard.groups[0].id);
  }

  function handleAdd(groupId) {
    const title = (taskDrafts[groupId] || "").trim();
    if (!title) return;

    const newTask = {
      id: `t${Date.now()}`,
      title,
      status: "Not Started",
      assignee: "",
      dueDate: "",
      updates: [],
      files: [],
    };

    const updatedGroups = demoBoard.groups.map((group) =>
      group.id === groupId
        ? { ...group, tasks: [...group.tasks, newTask] }
        : group
    );

    setDemoBoard({ ...demoBoard, groups: updatedGroups });
    setTaskDrafts((prev) => ({ ...prev, [groupId]: "" }));
  }

  function handleUpdateTask(groupId, updatedTask) {
    const updatedGroups = demoBoard.groups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            tasks: group.tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            ),
          }
        : group
    );
    setDemoBoard({ ...demoBoard, groups: updatedGroups });
  }

  function handleAddGroup() {
    const newGroup = {
      id: `g${Date.now()}`,
      title: "New Group",
      color: getRandomColor(),
      isCollapsed: false,
      tasks: [],
    };
    setDemoBoard((prev) => ({ ...prev, groups: [...prev.groups, newGroup] }));
  }

  function handleAddGroupAtTop() {
    const newGroup = {
      id: `g${Date.now()}`,
      title: "New Group",
      color: getRandomColor(),
      isCollapsed: false,
      tasks: [],
    };
    setDemoBoard((prev) => ({ ...prev, groups: [newGroup, ...prev.groups] }));
  }

  function handleDeleteGroup(groupId) {
    const updatedGroups = demoBoard.groups.filter(
      (group) => group.id !== groupId
    );
    setDemoBoard({ ...demoBoard, groups: updatedGroups });
  }

  function handleToggleCollapse(groupId) {
    const updatedGroups = demoBoard.groups.map((group) =>
      group.id === groupId
        ? { ...group, isCollapsed: !group.isCollapsed }
        : group
    );
    setDemoBoard({ ...demoBoard, groups: updatedGroups });
  }

  function handleDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;

    const srcGroupIdx = demoBoard.groups.findIndex(
      (g) => g.id === source.droppableId
    );
    const destGroupIdx = demoBoard.groups.findIndex(
      (g) => g.id === destination.droppableId
    );
    if (srcGroupIdx === -1 || destGroupIdx === -1) return;

    const srcGroup = demoBoard.groups[srcGroupIdx];
    const destGroup = demoBoard.groups[destGroupIdx];

    const [movedTask] = srcGroup.tasks.splice(source.index, 1);
    destGroup.tasks.splice(destination.index, 0, movedTask);

    const updatedGroups = [...demoBoard.groups];
    updatedGroups[srcGroupIdx] = { ...srcGroup };
    updatedGroups[destGroupIdx] = { ...destGroup };

    setDemoBoard((prev) => ({ ...prev, groups: updatedGroups }));
  }

  return {
    demoBoard,
    setDemoBoard,
    taskDrafts,
    setTaskDrafts,
    focusTaskId,
    setFocusTaskId,
    handleAddNewTask,
    handleAdd,
    handleUpdateTask,
    handleAddGroup,
    handleAddGroupAtTop,
    handleDeleteGroup,
    handleToggleCollapse,
    handleDragEnd,
  };
}