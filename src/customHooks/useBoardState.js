import { useState } from "react";
import { useSelector } from "react-redux";
import { getRandomColor } from "../services/util.service";
import { loadBoard, updateBoard, removeBoard as removeBoardAction } from "../store/board.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { boardService } from "../services/board";


export function useBoardState(board, onAddNewTask) {
  const currentBoard =
    board || useSelector((storeState) => storeState.boardModule.board);

  // const [board, updateBoard] = useState(() => currentBoard
  //   // currentBoard?.groups?.length
  //   //   ? currentBoard
  //   //   : {
  //   //     ...currentBoard,
  //   //     title: currentBoard?.title || "Monday - Sprint 4 - Design Approval",
  //   //     groups: [
  //   //       {
  //   //         id: "g1",
  //   //         title: "Frontend",
  //   //         color: getRandomColor(),
  //   //         isCollapsed: false,
  //   //         tasks: [
  //   //           {
  //   //             id: "t1",
  //   //             title: "Implement Task Preview UI 2",
  //   //             assignee: "John",
  //   //             status: "Working on it",
  //   //             dueDate: "May 26",
  //   //             timeline: { startDate: "2025-06-10", endDate: "2025-06-15" },
  //   //             priority: "High",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //           {
  //   //             id: "t2",
  //   //             title: "Build Board List component",
  //   //             assignee: "SS",
  //   //             status: "Done",
  //   //             dueDate: "May 25",
  //   //             timeline: { startDate: "2025-06-01", endDate: "2025-06-08" },
  //   //             priority: "Medium",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //           {
  //   //             id: "t3",
  //   //             title: "Create Task Details modal",
  //   //             assignee: "Mike",
  //   //             status: "Stuck",
  //   //             dueDate: "May 27",
  //   //             timeline: { startDate: "2025-06-12", endDate: "2025-06-20" },
  //   //             priority: "Critical ⚠️",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //           {
  //   //             id: "t4",
  //   //             title: "Add drag & drop for tasks",
  //   //             assignee: "SS",
  //   //             status: "Working on it",
  //   //             dueDate: "May 28",
  //   //             timeline: { startDate: "", endDate: "" },
  //   //             priority: "Low",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //         ],
  //   //       },
  //   //       {
  //   //         id: "g2",
  //   //         title: "Backend",
  //   //         color: getRandomColor(),
  //   //         isCollapsed: false,
  //   //         tasks: [
  //   //           {
  //   //             id: "t5",
  //   //             title: "Set up Express server",
  //   //             assignee: "SS",
  //   //             status: "Working on it",
  //   //             dueDate: "May 30",
  //   //             timeline: { startDate: "2025-06-15", endDate: "2025-06-25" },
  //   //             priority: "High",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //           {
  //   //             id: "t6",
  //   //             title: "Create MongoDB schema files",
  //   //             assignee: "John",
  //   //             status: "Working on it",
  //   //             dueDate: "May 30",
  //   //             timeline: { startDate: "2025-06-20", endDate: "2025-06-30" },
  //   //             priority: "Medium",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //           {
  //   //             id: "t7",
  //   //             title: "Build Login & Signup pages",
  //   //             assignee: "Mike",
  //   //             status: "Working on it",
  //   //             dueDate: "May 31",
  //   //             timeline: { startDate: "", endDate: "" },
  //   //             priority: "Low",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //         ],
  //   //       },
  //   //       {
  //   //         id: "g3",
  //   //         title: "UI/UX Design",
  //   //         color: getRandomColor(),
  //   //         isCollapsed: false,
  //   //         tasks: [
  //   //           {
  //   //             id: "t8",
  //   //             title: "Wireframes",
  //   //             assignee: "Anna",
  //   //             status: "Done",
  //   //             dueDate: "May 15",
  //   //             timeline: { startDate: "2025-05-01", endDate: "2025-05-10" },
  //   //             priority: "Low",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //           {
  //   //             id: "t9",
  //   //             title: "Prototypes",
  //   //             assignee: "Mike",
  //   //             status: "Working on it",
  //   //             dueDate: "May 18",
  //   //             timeline: { startDate: "2025-05-11", endDate: "2025-05-20" },
  //   //             priority: "High",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //         ],
  //   //       },
  //   //       {
  //   //         id: "g4",
  //   //         title: "Deployment",
  //   //         color: getRandomColor(),
  //   //         isCollapsed: false,
  //   //         tasks: [
  //   //           {
  //   //             id: "t10",
  //   //             title: "Prepare Docker Images",
  //   //             assignee: "John",
  //   //             status: "Done",
  //   //             dueDate: "May 12",
  //   //             timeline: { startDate: "2025-05-01", endDate: "2025-05-10" },
  //   //             priority: "Medium",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //           {
  //   //             id: "t11",
  //   //             title: "Deploy to Production",
  //   //             assignee: "SS",
  //   //             status: "Not Started",
  //   //             dueDate: "May 20",
  //   //             timeline: { startDate: "2025-05-15", endDate: "2025-05-30" },
  //   //             priority: "Critical ⚠️",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //         ],
  //   //       },
  //   //       {
  //   //         id: "g5",
  //   //         title: "QA Testing",
  //   //         color: getRandomColor(),
  //   //         isCollapsed: false,
  //   //         tasks: [
  //   //           {
  //   //             id: "t12",
  //   //             title: "Write Test Cases",
  //   //             assignee: "Anna",
  //   //             status: "Done",
  //   //             dueDate: "May 17",
  //   //             timeline: { startDate: "2025-05-05", endDate: "2025-05-12" },
  //   //             priority: "Medium",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //           {
  //   //             id: "t13",
  //   //             title: "Run Regression Tests",
  //   //             assignee: "Mike",
  //   //             status: "Working on it",
  //   //             dueDate: "May 19",
  //   //             timeline: { startDate: "2025-05-13", endDate: "2025-05-20" },
  //   //             priority: "Low",
  //   //             isChecked: false,
  //   //             updates: [],
  //   //             files: [],
  //   //           },
  //   //         ],
  //   //       },
  //   //     ],
  //   //   }
  // );

  const [taskDrafts, setTaskDrafts] = useState({});
  const [focusTaskId, setFocusTaskId] = useState(null);

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

 async function handleUpdateTask(updatedTask) {
  try {
    const updatedBoard = await boardService.updateTask(
      board,
      updatedTask.id,
      updatedTask
    );
    await updateBoard(updatedBoard);
    showSuccessMsg("Board updated successfully");
  } catch (err) {
    console.log("error task handle update");
    showErrorMsg("Cannot update board");
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

  async function handleRemoveBoard(boardId) {
    try {
      await removeBoardAction(boardId);
      showSuccessMsg("Board removed successfully");
    } catch (err) {
      showErrorMsg("Failed to remove board");
    }
  }

  return {
    board,
    updateBoard,
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
    handleRemoveBoard,
  };
}