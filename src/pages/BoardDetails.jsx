import {useState, useEffect, useRef, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import {showSuccessMsg, showErrorMsg} from "../services/event-bus.service";
import {loadBoard, updateBoard} from "../store/board.actions";
import {BoardHeader} from "../cmps/board-header/BoardHeader";
import {BoardTable} from "../cmps/BoardTable";
import {BoardDashboard} from "./BoardDashboard";
import {TaskDetailModal} from "../cmps/task-detail-modal/TaskDetailModal";
import {AddWidgetModal} from "../cmps/dashboard/AddWidgetModal";
import {makeId} from "../services/util.service";

export function BoardDetails({openTaskId, setOpenTaskId}) {
  const {boardId} = useParams();
  const board = useSelector((storeState) => storeState.boardModule.board);
  const boards = useSelector((storeState) => storeState.boardModule.boards);

  const boardTableRef = useRef(null);
  const addWidgetBtnRef = useRef(null);
  const [boardForModal, setBoardForModal] = useState(null);
  const [views, setViews] = useState([
    {id: makeId(), type: "table", name: "Main Table"},
  ]);
  const [activeViewId, setActiveViewId] = useState(views[0].id);
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);
  const [addWidgetButtonRef, setAddWidgetButtonRef] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [selectedSortField, setSelectedSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const activeView = views.find((v) => v.id === activeViewId) || views[0];

  useEffect(() => {
    if (boardId) {
      _loadBoard(boardId);
    }
  }, [boardId, boards]);

  async function _loadBoard() {
    try {
      const currBoard = await loadBoard(boardId);
      console.log("currBoard", currBoard);
    } catch (err) {
      console.error("Error loading board:", err);
    }
  }

  async function handleUpdateBoard(updatedBoard) {
    try {
      await updateBoard(updatedBoard);
      showSuccessMsg("Board updated successfully");
    } catch (err) {
      showErrorMsg("Cannot update board");
    }
  }

  function handleOpenUpdates(taskId, boardSnapshot) {
    setOpenTaskId(taskId);
    setBoardForModal(boardSnapshot);
  }

  function handleAddNewTask() {
    if (boardTableRef.current && boardTableRef.current.handleAddNewTask) {
      boardTableRef.current.handleAddNewTask();
    }
  }

  function handleAddNewGroup() {
    if (boardTableRef.current && boardTableRef.current.handleAddGroupAtTop) {
      boardTableRef.current.handleAddGroupAtTop();
    }
  }

  function handleAddView(viewType) {
    let viewName = viewType.charAt(0).toUpperCase() + viewType.slice(1);
    if (viewType === "dashboard") viewName = "Chart";
    const newView = {id: makeId(), type: viewType, name: viewName};
    setViews((prevViews) => [...prevViews, newView]);
    setActiveViewId(newView.id);
  }

  function handleUpdateView(viewId, newType) {
    setViews((prevViews) =>
      prevViews.map((view) => {
        let newName = newType.charAt(0).toUpperCase() + newType.slice(1);
        if (newType === "dashboard") newName = "Chart";
        return view.id === viewId
          ? {...view, type: newType, name: newName}
          : view;
      })
    );
  }

  function handleSetActiveView(viewId) {
    setActiveViewId(viewId);
  }

  function handleOpenAddWidgetModal(buttonRef) {
    setAddWidgetButtonRef(buttonRef);
    setIsAddWidgetModalOpen(true);
  }

  function handleSelectWidget(widget) {}

  function handleUpdateViews(newViews) {
    setViews(newViews);
  }

  // --- FILTER BY PERSON LOGIC ---
  function getFilteredByPerson() {
    if (!board) return [];
    if (!selectedPersonId) return board.groups;
    return board.groups
      .map(group => ({
        ...group,
        tasks: group.tasks.filter(task =>
          (Array.isArray(task.members) && task.members.some(m => m._id === selectedPersonId)) ||
          (task.assignee && (task.assignee._id === selectedPersonId || task.assignee === selectedPersonId))
        )
      }))
      .filter(group => group.tasks.length > 0);
  }

  // --- FILTER BY SEARCH LOGIC ---
  function getFilteredBySearch(groupsToFilter) {
    if (!searchText.trim()) return groupsToFilter;
    
    const searchLower = searchText.toLowerCase();
    return groupsToFilter
      .map(group => ({
        ...group,
        tasks: group.tasks.filter(task => {
          // Search in task title
          if (task.title && task.title.toLowerCase().includes(searchLower)) return true;
          
          // Search in task description
          if (task.description && task.description.toLowerCase().includes(searchLower)) return true;
          
          // Search in task status
          if (task.status && task.status.toLowerCase().includes(searchLower)) return true;
          
          // Search in task priority
          if (task.priority && task.priority.toLowerCase().includes(searchLower)) return true;
          
          // Search in task assignee name
          if (task.assignee) {
            const assigneeName = typeof task.assignee === 'string' ? task.assignee : 
              (task.assignee.fullname || task.assignee.firstName || task.assignee.name || '');
            if (assigneeName.toLowerCase().includes(searchLower)) return true;
          }
          
          // Search in task members names
          if (Array.isArray(task.members)) {
            const hasMatchingMember = task.members.some(member => {
              const memberName = member.fullname || member.firstName || member.name || '';
              return memberName.toLowerCase().includes(searchLower);
            });
            if (hasMatchingMember) return true;
          }
          
          // Search in task updates/comments
          if (Array.isArray(task.updates)) {
            const hasMatchingUpdate = task.updates.some(update => {
              const updateText = update.text || update.comment || '';
              return updateText.toLowerCase().includes(searchLower);
            });
            if (hasMatchingUpdate) return true;
          }
          
          return false;
        })
      }))
      .filter(group => group.tasks.length > 0);
  }

  // --- SORT LOGIC ---
  function getSortedGroups(groupsToSort) {
    if (!selectedSortField) return groupsToSort;
    const dir = sortDirection === 'desc' ? -1 : 1;
    const getValue = (task) => {
      switch (selectedSortField) {
        case 'name': return task.title || '';
        case 'person': return task.assignee || '';
        case 'status': return task.status || '';
        case 'date': return task.dueDate || '';
        case 'timeline': return task.timeline?.startDate || '';
        case 'priority': return task.priority || '';
        case 'file': return Array.isArray(task.files) ? task.files.length : 0;
        default: return '';
      }
    };
    return groupsToSort.map(group => ({
      ...group,
      tasks: [...group.tasks].sort((a, b) => {
        const aVal = getValue(a);
        const bVal = getValue(b);
        if (selectedSortField === 'date' || selectedSortField === 'timeline') {
          return (new Date(aVal) - new Date(bVal)) * dir;
        }
        if (selectedSortField === 'file') {
          return (aVal - bVal) * dir;
        }
        return aVal.localeCompare(bVal, undefined, { numeric: true }) * dir;
      })
    }));
  }

  // --- COMBINE FILTERS & SORT ---
  const filteredByPerson = useMemo(() => board ? getFilteredByPerson() : [], [selectedPersonId, board]);
  const filteredBySearch = useMemo(() => getFilteredBySearch(filteredByPerson), [searchText, filteredByPerson]);
  const sortedGroups = useMemo(() => getSortedGroups(filteredBySearch), [filteredBySearch, selectedSortField, sortDirection]);

  if (!board) {
    return <div>Loading board...</div>;
  }

  return (
    <section
      className={`board-details ${openTaskId ? "with-modal" : ""} ${
        activeView.type
      }`}
    >
      <BoardHeader
        board={board}
        onUpdateBoard={handleUpdateBoard}
        onAddNewTask={handleAddNewTask}
        onAddNewGroup={handleAddNewGroup}
        views={views}
        activeViewId={activeViewId}
        onAddView={handleAddView}
        onUpdateView={handleUpdateView}
        onSetActiveView={handleSetActiveView}
        onAddWidget={handleOpenAddWidgetModal}
        addWidgetBtnRef={addWidgetBtnRef}
        onUpdateViews={handleUpdateViews}
        searchText={searchText}
        setSearchText={setSearchText}
        selectedPersonId={selectedPersonId}
        setSelectedPersonId={setSelectedPersonId}
        selectedSortField={selectedSortField}
        setSelectedSortField={setSelectedSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <div className="board-content-container">
        {activeView.type === "table" ? (
          <div className="board-table-container">
            <BoardTable
              ref={boardTableRef}
              board={board}
              filteredTasks={sortedGroups}
              onUpdateTask={handleUpdateBoard}
              onAddNewTask={(task, groupId) => {}}
              onOpenUpdates={handleOpenUpdates}
            />
          </div>
        ) : activeView.type === "kanban" ? (
          <div
            className="kanban-placeholder"
            style={{
              padding: "48px",
              textAlign: "center",
              color: "#888",
              fontSize: "1.5rem",
            }}
          >
            Kanban view
          </div>
        ) : (
          <div className="board-dashboard-container">
            <BoardDashboard
              board={board}
              onUpdateBoard={handleUpdateBoard}
              onAddWidget={() => handleOpenAddWidgetModal(addWidgetBtnRef)}
            />
          </div>
        )}
      </div>

      {openTaskId && (
        <TaskDetailModal
          taskId={openTaskId}
          board={boardForModal}
          onClose={() => setOpenTaskId(null)}
        />
      )}

      <AddWidgetModal
        isOpen={isAddWidgetModalOpen}
        onClose={() => setIsAddWidgetModalOpen(false)}
        onSelectWidget={handleSelectWidget}
        buttonRef={addWidgetButtonRef}
      />
    </section>
  );
}
