import { useState } from "react"
import { useSelector } from "react-redux"
import { getRandomColor } from "../services/util.service"
import { updateBoard } from "../store/board.actions.js"

export function useBoardState(board, onAddNewTask) {
  const currentBoard =
    board || useSelector((storeState) => storeState.boardModule.board)

  const [demoBoard, setDemoBoard] = useState(currentBoard)
  const [taskDrafts, setTaskDrafts] = useState({})
  const [focusTaskId, setFocusTaskId] = useState(null)

  async function saveBoardChanges(updatedBoard) {
    setDemoBoard(updatedBoard)
    try {
      await updateBoard(updatedBoard)
    } catch (err) {
      console.error("❌ Failed to save board:", err)
    }
  }

  function handleAddNewTask() {
    let updatedBoard = { ...demoBoard }

    if (!updatedBoard.groups?.length) {
      updatedBoard.groups = [
        {
          id: `g${Date.now()}`,
          title: "New Group",
          color: getRandomColor(),
          isCollapsed: false,
          tasks: [],
        },
      ]
    }

    const newTask = {
      id: `t${Date.now()}`,
      title: "New task",
      assignee: "",
      status: "Not Started",
      dueDate: "",
      priority: "Medium",
      isChecked: false,
      updates: [],
      files: [],
    }

    updatedBoard.groups[0].tasks = [newTask, ...updatedBoard.groups[0].tasks]

    setDemoBoard(updatedBoard)
    setFocusTaskId(newTask.id)

    if (onAddNewTask) onAddNewTask(newTask, updatedBoard.groups[0].id)
  }

  async function handleAdd(groupId) {
    const title = (taskDrafts[groupId] || "").trim()
    if (!title) return

    const newTask = {
      id: `t${Date.now()}`,
      title,
      assignee: "",
      status: "Not Started",
      dueDate: "",
      priority: "Medium",
      updates: [],
      files: [],
    }

    const updatedGroups = demoBoard.groups.map((group) =>
      group.id === groupId ? { ...group, tasks: [...group.tasks, newTask] } : group
    )

    const updatedBoard = { ...demoBoard, groups: updatedGroups }

    await saveBoardChanges(updatedBoard)
    setTaskDrafts((prev) => ({ ...prev, [groupId]: "" }))
  }

  async function handleUpdateTask(groupId, updatedTask) {
    const updatedGroups = demoBoard.groups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            tasks: group.tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            ),
          }
        : group
    )

    const updatedBoard = { ...demoBoard, groups: updatedGroups }
    await saveBoardChanges(updatedBoard)
  }

  async function handleAddGroup() {
    const newGroup = {
      id: `g${Date.now()}`,
      title: "New Group",
      color: getRandomColor(),
      isCollapsed: false,
      tasks: [],
    }

    const updatedBoard = {
      ...demoBoard,
      groups: [...demoBoard.groups, newGroup],
    }

    await saveBoardChanges(updatedBoard)
  }

  async function handleAddGroupAtTop() {
    const newGroup = {
      id: `g${Date.now()}`,
      title: "New Group",
      color: getRandomColor(),
      isCollapsed: false,
      tasks: [],
    }

    const updatedBoard = {
      ...demoBoard,
      groups: [newGroup, ...demoBoard.groups],
    }

    await saveBoardChanges(updatedBoard)
  }

  async function handleDeleteGroup(groupId) {
    const updatedGroups = demoBoard.groups.filter((group) => group.id !== groupId)
    const updatedBoard = { ...demoBoard, groups: updatedGroups }

    await saveBoardChanges(updatedBoard)
  }

  async function handleToggleCollapse(groupId) {
    const updatedGroups = demoBoard.groups.map((group) =>
      group.id === groupId
        ? { ...group, isCollapsed: !group.isCollapsed }
        : group
    )

    const updatedBoard = { ...demoBoard, groups: updatedGroups }

    await saveBoardChanges(updatedBoard)
  }

  async function handleDragEnd(result) {
    const { source, destination } = result
    if (!destination) return

    const srcGroupIdx = demoBoard.groups.findIndex(
      (g) => g.id === source.droppableId
    )
    const destGroupIdx = demoBoard.groups.findIndex(
      (g) => g.id === destination.droppableId
    )
    if (srcGroupIdx === -1 || destGroupIdx === -1) return

    const srcGroup = demoBoard.groups[srcGroupIdx]
    const destGroup = demoBoard.groups[destGroupIdx]

    const [movedTask] = srcGroup.tasks.splice(source.index, 1)
    destGroup.tasks.splice(destination.index, 0, movedTask)

    const updatedGroups = [...demoBoard.groups]
    updatedGroups[srcGroupIdx] = { ...srcGroup }
    updatedGroups[destGroupIdx] = { ...destGroup }

    const updatedBoard = { ...demoBoard, groups: updatedGroups }

    await saveBoardChanges(updatedBoard)
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
  }
}
