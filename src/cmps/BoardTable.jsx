import { useState, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { GroupHeader } from "./GroupHeader";
import { TableHeader } from "./table/TableHeader";
import { DynamicTaskRow } from "./table/DynamicTaskRow";
import { getRandomColor } from "../services/util.service";
import { AddBoard } from "./svg/AddBoard";
import { TaskDetailModal } from "./task-detail-modal/TaskDetailModal";
import { CrudlBar } from "./CrudlBar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const BoardTable = forwardRef(function BoardTable(
  { board, onUpdateTask, onAddNewTask },
  ref
) {
  const currentBoard =
    board || useSelector((storeState) => storeState.boardModule.board);
  const [taskDrafts, setTaskDrafts] = useState({});
  const [focusTaskId, setFocusTaskId] = useState(null);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

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

  function handleAddNewTask() {
    let updatedBoard = { ...demoBoard };

    if (!updatedBoard.groups?.length) {
      updatedBoard.groups = [
        {
          id: `g${Date.now()}`,
          title: "New Group",
          color: getRandomColor(),
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
      tasks: [],
    };
    setDemoBoard((prev) => ({ ...prev, groups: [...prev.groups, newGroup] }));
  }

  function handleAddGroupAtTop() {
    const newGroup = {
      id: `g${Date.now()}`,
      title: "New Group",
      color: getRandomColor(),
      tasks: [],
    };
    setDemoBoard((prev) => ({ ...prev, groups: [newGroup, ...prev.groups] }));
  }

  function handleDeleteGroup(groupId) {
    const updatedGroups = demoBoard.groups.filter(
      (group) => group.id !== groupId
    );
    setDemoBoard({ ...demoBoard, groups: updatedGroups });

    setSelectedTasks((prev) => prev.filter((sg) => sg.groupId !== groupId));
  }

  function toggleAllInGroup(groupId, isChecked) {
    const updatedGroups = demoBoard.groups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            tasks: group.tasks.map((task) => ({ ...task, isChecked })),
          }
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

  function handleOpenUpdates(taskId) {
    console.log("Opening modal for task:", taskId);
    setOpenTaskId(taskId);
  }

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

  useImperativeHandle(ref, () => ({
    handleAddNewTask,
    handleAddGroupAtTop,
  }));

  return (
    <div className="board-table">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="table-wrapper">
          {demoBoard.groups?.map((group) => (
            <Droppable droppableId={group.id} key={group.id}>
              {(provided) => (
                <div
                  className="group-section"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <GroupHeader
                    group={group}
                    onDeleteGroup={handleDeleteGroup}
                  />
                  <div className="tasks-container">
                    <TableHeader
                      onToggleAll={(checked) =>
                        toggleAllInGroup(group.id, checked)
                      }
                      groupColor={group.color}
                      isAllSelected={areAllTasksSelected(group.id)}
                      hasSelection={selectedTasks.some(
                        (sg) => sg.groupId === group.id && sg.taskIds.length > 0
                      )}
                    />
                    {group.tasks?.map((task, idx) => (
                      <Draggable
                        draggableId={task.id}
                        index={idx}
                        key={task.id}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <DynamicTaskRow
                              task={task}
                              groupColor={group.color}
                              onUpdateTask={(updatedTask) =>
                                handleUpdateTask(group.id, updatedTask)
                              }
                              shouldFocus={focusTaskId === task.id}
                              onFocusHandled={() => setFocusTaskId(null)}
                              isDragging={snapshot.isDragging}
                              onOpenUpdates={handleOpenUpdates}
                              onTaskSelection={(isSelected) =>
                                handleTaskSelection(
                                  task.id,
                                  group.id,
                                  isSelected
                                )
                              }
                              isSelected={selectedTasks.some(
                                (sg) =>
                                  sg.groupId === group.id &&
                                  sg.taskIds.includes(task.id)
                              )}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    <div
                      className="add-task-row"
                      style={{ "--group-color": group.color }}
                    >
                      <div className="col-left-indicator"></div>
                      <div className="col-checkbox">
                        <input
                            disabled
                            type="checkbox"
                        />
                      </div>
                      <div className="col-task">
                        <input
                          type="text"
                          placeholder="+ Add task"
                          className="input-add-task"
                          value={taskDrafts[group.id] || ""}
                          onChange={(e) =>
                            setTaskDrafts((prev) => ({
                              ...prev,
                              [group.id]: e.target.value,
                            }))
                          }
                          onBlur={() => handleAdd(group.id)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAdd(group.id)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {openTaskId && (
        <TaskDetailModal
          taskId={openTaskId}
          board={demoBoard}
          onClose={() => setOpenTaskId(null)}
        />
      )}

      <CrudlBar
        selectedTasks={selectedTasks}
        groups={demoBoard.groups}
        onDuplicate={handleDuplicateSelected}
        onDelete={handleDeleteSelected}
        onMoveToGroup={handleMoveSelectedToGroup}
        onClearSelection={handleClearSelection}
      />

      <div className="add-group-container">
        <button className="btn-add-group" onClick={handleAddGroup}>
          <AddBoard className="icon" />
          <span>Add new group</span>
        </button>
      </div>
    </div>
  );
});
