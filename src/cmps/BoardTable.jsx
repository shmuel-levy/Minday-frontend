import {forwardRef, useImperativeHandle, useState, useRef} from "react";
import {GroupHeader} from "./GroupHeader";
import {TableHeader} from "./table/TableHeader";
import {DynamicTaskRow} from "./table/DynamicTaskRow";
import {AddBoard} from "./svg/AddBoard";
import {CrudlBar} from "./CrudlBar";
import {TaskDetailModal} from "./task-detail-modal/TaskDetailModal";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useBoardState} from "../customHooks/useBoardState";
import {useTaskSelection} from "../customHooks/useTaskSelection";
import {TaskCheckbox} from "./TaskCheckbox";
import {GroupSummaryRow} from "../cmps/GroupSummaryRow";
import {loadBoard, updateBoard} from "../store/board.actions";
import { SearchEmptyState } from './SearchEmptyState';
import { AddColumnPopover } from "./table/column-types/AddColumnPopover";

export const BoardTable = forwardRef(function BoardTable(
  {board, onUpdateTask, onAddNewTask, onOpenUpdates},
  ref
) {
  const [openTaskId, setOpenTaskId] = useState(null);
  const addColumnBtnRef = useRef(null)
  const [isAddColumnPopoverOpen, setAddColumnPopoverOpen] = useState(false);
  const [addColumnAnchorEl, setAddColumnAnchorEl] = useState(null);
  const {
    // board,
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
  } = useTaskSelection(board);

  function handleDeleteGroupWithCleanup(groupId) {
    handleDeleteGroup(groupId);
    cleanupSelections(groupId);
  }

  function handleOpenUpdates(taskId) {
    setOpenTaskId(taskId);
  }

  async function handleUpdateGroup(updatedGroup) {
    const updatedGroups = board.groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    await updateBoard({...board, groups: updatedGroups});
  }

  async function handleUpdateAdded(taskId, groupId, newUpdate) {
    await updateBoard({
      ...board,
      groups: board.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === taskId
                  ? {...task, updates: [...(task.updates || []), newUpdate]}
                  : task
              ),
            }
          : group
      ),
    });
  }
      function handleAddColumn(type) {
    setAddColumnPopoverOpen(false);
    setAddColumnAnchorEl(null);
  }

  function handleAddColumnClick(e) {
    setAddColumnPopoverOpen(true);
    setAddColumnAnchorEl(e.currentTarget);
  }

  useImperativeHandle(ref, () => ({
    handleAddNewTask,
    handleAddGroupAtTop,
  }));

  const groupsToShow = (board.groups && board.groups.length > 0) ? board.groups : board.groups;

  if (board.groups && board.groups.length === 0) {
    return <div style={{height: 'calc(100% - var(--board-header-height))'}}><SearchEmptyState /></div>;
  }


  return (
    <div className="board-table" style={{position: 'relative'}}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="table-wrapper">
          {groupsToShow.map((group) => (
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
                      <div className={`row-with-spacer ${group.isCollapsed ? 'collapsed' : ''}`}>
                        <div className="row-left-spacer"></div>
                        <TableHeader
                          onToggleAll={(checked) =>
                            toggleAllInGroup(group.id, checked)
                          }
                          groupColor={group.color}
                          isAllSelected={areAllTasksSelected(group.id)}
                          hasSelection={selectedTasks.some(
                            (sg) =>
                              sg.groupId === group.id && sg.taskIds.length > 0
                          )}
                          addColumnBtnRef={addColumnBtnRef}
                          onAddColumnClick={handleAddColumnClick}
                        />
                      </div>
                      {group.tasks?.map((task, idx) => (
                        <div className="row-with-spacer" key={task.id}>
                          <div className="row-left-spacer"></div>

                          <Draggable draggableId={task.id} index={idx}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style, 
                                  width: "100%",
                                }}
                              >
                                <DynamicTaskRow
                                  task={task}
                                  groupColor={group.color}
                                  onUpdateTask={(updatedTask) =>
                                    handleUpdateTask(updatedTask)
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
                        </div>
                      ))}
                      {provided.placeholder}

                      <div className="row-with-spacer">
                        <div className="row-left-spacer"></div>

                        <div
                          className="add-task-row"
                          style={{"--group-color": group.color}}
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
                      </div>

                      <div className="row-with-spacer">
                        <div className="row-left-spacer"></div>

                        <GroupSummaryRow group={group} />
                      </div>
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
        groups={board.groups}
        onDuplicate={handleDuplicateSelected}
        onDelete={handleDeleteSelected}
        onMoveToGroup={handleMoveSelectedToGroup}
        onClearSelection={handleClearSelection}
      />

      {openTaskId && (
        <TaskDetailModal
          taskId={openTaskId}
          board={board}
          onClose={() => setOpenTaskId(null)}
          onUpdateAdded={handleUpdateAdded}
        />
      )}

      <div className="add-group-container ">
        <button
          className="btn-add-group  flex align-center"
          onClick={handleAddGroup}
        >
          <AddBoard className="icon" />
          <span>Add new group</span>
        </button>
      </div>

              <AddColumnPopover
                isOpen={isAddColumnPopoverOpen}
                anchorRef={{ current: addColumnAnchorEl }}
                onClose={() => { setAddColumnPopoverOpen(false); setAddColumnAnchorEl(null); }}
                onAddColumn={handleAddColumn}
            />
    </div>
  );
});
