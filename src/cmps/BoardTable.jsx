import { forwardRef, useImperativeHandle, useState } from "react";
import { GroupHeader } from "./GroupHeader";
import { TableHeader } from "./table/TableHeader";
import { DynamicTaskRow } from "./table/DynamicTaskRow";
import { AddBoard } from "./svg/AddBoard";
import { CrudlBar } from "./CrudlBar";
import { TaskDetailModal } from "./task-detail-modal/TaskDetailModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useBoardState } from "../customHooks/useBoardState";
import { useTaskSelection } from "../customHooks/useTaskSelection";
import { TaskCheckbox } from "./TaskCheckbox";
import { GroupSummaryRow } from "../cmps/GroupSummaryRow"

export const BoardTable = forwardRef(function BoardTable(
  { board, onUpdateTask, onAddNewTask, onOpenUpdates },
  ref
) {
  const [openTaskId, setOpenTaskId] = useState(null);

  const {
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
  } = useBoardState(board, onAddNewTask);

  const {
    selectedTasks,
    handleTaskSelection,
    toggleAllInGroup,
    areAllTasksSelected,
    handleDuplicateSelected,
    handleDeleteSelected,
    handleMoveSelectedToGroup,
    handleClearSelection,
    cleanupSelections,
  } = useTaskSelection(demoBoard, setDemoBoard);

  function handleDeleteGroupWithCleanup(groupId) {
    handleDeleteGroup(groupId);
    cleanupSelections(groupId);
  }

  function handleOpenUpdates(taskId) {
    setOpenTaskId(taskId);
  }

  function handleUpdateGroup(updatedGroup) {
    const updatedGroups = demoBoard.groups.map(group =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setDemoBoard(prev => ({ ...prev, groups: updatedGroups }))
  }

  function handleUpdateAdded(taskId, groupId, newUpdate) {
    setDemoBoard(prevBoard => ({
      ...prevBoard,
      groups: prevBoard.groups.map(group =>
        group.id === groupId
          ? {
            ...group,
            tasks: group.tasks.map(task =>
              task.id === taskId
                ? { ...task, updates: [...(task.updates || []), newUpdate] }
                : task
            )
          }
          : group
      )
    }));
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
                    onDeleteGroup={handleDeleteGroupWithCleanup}
                    onToggleCollapse={handleToggleCollapse}
                    onUpdateGroup={handleUpdateGroup}
                  />

                  {!group.isCollapsed && (
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
                          <TaskCheckbox disabled />
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
                      <GroupSummaryRow group={group} />
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <CrudlBar
        selectedTasks={selectedTasks}
        groups={demoBoard.groups}
        onDuplicate={handleDuplicateSelected}
        onDelete={handleDeleteSelected}
        onMoveToGroup={handleMoveSelectedToGroup}
        onClearSelection={handleClearSelection}
      />

      {openTaskId && (
        <TaskDetailModal
          taskId={openTaskId}
          board={demoBoard}
          onClose={() => setOpenTaskId(null)}
          onUpdateAdded={handleUpdateAdded}
        />
      )}

      <div className="add-group-container ">
        <button className="btn-add-group  flex align-center" onClick={handleAddGroup}>
          <AddBoard className="icon" />
          <span>Add new group</span>
        </button>
      </div>
    </div>
  );
});