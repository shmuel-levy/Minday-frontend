import {useState, useEffect, useRef, useCallback} from "react";
import {useParams, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import {showSuccessMsg, showErrorMsg} from "../services/event-bus.service";
import {loadBoard, updateBoard} from "../store/board.actions";
import {BoardHeader} from "../cmps/board-header/BoardHeader";
import {BoardTable} from "../cmps/BoardTable";
import {Dashboard} from "./Dashboard";
import {TaskDetailModal} from "../cmps/task-detail-modal/TaskDetailModal";
import {AddWidgetModal} from "../cmps/dashboard/AddWidgetModal";
import {KanbanBoard} from "../cmps/kanban/KanbanBoard";
import {makeId} from "../services/util.service";
import {BoardFilters} from "../cmps/BoardFilters";
import { recordRecentBoard, saveBoardViews, loadBoardViews } from '../services/board/board.service.local'
import { Loader } from '../cmps/Loader';

export function BoardDetails({openTaskId, setOpenTaskId}) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialWidget = query.get('widget');

  const {boardId} = useParams();
  const board = useSelector((storeState) => storeState.boardModule.board);
  const boards = useSelector((storeState) => storeState.boardModule.boards);

  
  const boardTableRef = useRef(null);
  const addWidgetBtnRef = useRef(null);
  const dashboardRef = useRef(null);
  const [boardForModal, setBoardForModal] = useState(null);
  const { views: initialViews, activeViewId: initialActiveViewId } = loadBoardViews(boardId);
  const [views, setViews] = useState(initialViews);
  const [activeViewId, setActiveViewId] = useState(initialActiveViewId);
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [selectedSortField, setSelectedSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredBoard, setFilteredBoard] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState([]);

  useEffect(() => {
    if (board) recordRecentBoard(board)
  }, [board?._id]) 

  useEffect(() => {
    if (boardId) {
      _loadBoard(boardId);
      const { views: loadedViews, activeViewId: loadedActiveViewId } = loadBoardViews(boardId);
      setViews(loadedViews);
      setActiveViewId(loadedActiveViewId);
    }
  }, [boardId])

  useEffect(() => {
    if (board && board.selectedWidget !== undefined) {
      setSelectedWidget(board.selectedWidget)
    } else if (initialWidget) {
      setSelectedWidget(initialWidget)
    } else {
      setSelectedWidget(null)
    }
  }, [initialWidget])

  async function _loadBoard() {
    try {
      const currBoard = await loadBoard(boardId)
    } catch (err) {
      console.error("Error loading board:", err)
    }
  }

  async function handleUpdateBoard(updatedBoard) {
    try {
      await updateBoard(updatedBoard);
      showSuccessMsg("Board updated successfully")
    } catch (err) {
      showErrorMsg("Cannot update board")
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
    const updatedViews = [...views, newView];
    setViews(updatedViews);
    setActiveViewId(newView.id);
    saveBoardViews(boardId, updatedViews, newView.id);

    if (viewType === "dashboard") {
      const updatedBoard = { ...board, selectedWidget: null };
      updateBoard(updatedBoard);
      setSelectedWidget(null);
    }
  }

  function handleUpdateView(viewId, newType) {
    const updatedViews = views.map((view) => {
      let newName = newType.charAt(0).toUpperCase() + newType.slice(1);
      if (newType === "dashboard") newName = "Chart";
      return view.id === viewId
        ? {...view, type: newType, name: newName}
        : view;
    });
    setViews(updatedViews);
    saveBoardViews(boardId, updatedViews, activeViewId);
  }

  function handleSetActiveView(viewId) {
    setActiveViewId(viewId);
    saveBoardViews(boardId, views, viewId);

    const view = views.find(v => v.id === viewId);
    if (view && view.type === "dashboard" && !board.selectedWidget) {
      setSelectedWidget(null);
    }
  }

  function handleOpenWidgetModal() {
    setIsAddWidgetModalOpen(true);
  }

  function handleCloseWidgetModal() {
    setIsAddWidgetModalOpen(false);
  }

  function handleSelectWidget(widgetTitle) {
    console.log('BoardDetails - handleSelectWidget called with:', widgetTitle);
    console.log('BoardDetails - setting selectedWidget to:', widgetTitle);
    setSelectedWidget(widgetTitle);
    setIsAddWidgetModalOpen(false);
  }

  function handleUpdateViews(newViews) {
    setViews(newViews);
    saveBoardViews(boardId, newViews, activeViewId);
  }

  function handlePinView(viewId) {
    setViews((prevViews) =>
      prevViews.map((view) =>
        view.id === viewId ? { ...view, isPinned: true } : view
      )
    );
  }

  function handleUnpinView(viewId) {
    setViews((prevViews) =>
      prevViews.map((view) =>
        view.id === viewId ? { ...view, isPinned: false } : view
      )
    );
  }

  const handleFiltersChange = useCallback((filters) => {
    // Handle filters change if needed
  }, []);

  const handleFilteredBoardChange = useCallback((newFilteredBoard) => {
    setFilteredBoard(newFilteredBoard);
  }, []);

  const handleApplyFilters = useCallback((filters) => {
    setAdvancedFilters(filters);
  }, []);

  const extractMembers = () => {
    if (!board) return [];
    
    const allMembers = new Map();
    
    if (board.members && board.members.length > 0) {
      board.members.forEach(member => {
        if (member._id) {
          allMembers.set(member._id, {
            _id: member._id,
            fullname: member.fullname || member.firstName,
            firstName: member.firstName,
            imgUrl: member.imgUrl || member.profileImg,
            profileImg: member.profileImg || member.imgUrl
          });
        }
      });
    }
    
    if (board.groups) {
      board.groups.forEach(group => {
        group.tasks.forEach(task => {
          if (task.members && task.members.length > 0) {
            task.members.forEach(member => {
              if (member._id) {
                allMembers.set(member._id, {
                  _id: member._id,
                  fullname: member.name || member.fullname || member.firstName,
                  firstName: member.firstName || member.name,
                  imgUrl: member.imgUrl || member.profileImg,
                  profileImg: member.profileImg || member.imgUrl
                });
              }
              if (typeof member === 'string') {
                allMembers.set(member, { _id: member, fullname: member });
              }
            });
          }
          if (task.assignee && !allMembers.has(task.assignee)) {
            allMembers.set(task.assignee, {
              _id: task.assignee,
              fullname: task.assignee
            });
          }
        });
      });
    }
    
    return Array.from(allMembers.values());
  };

  const members = extractMembers();

  const activeView = views.find((v) => v.id === activeViewId) || views[0];

  if (!board || board._id !== boardId) {
    return <Loader text="Loading board..." />
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
        onAddWidget={handleSelectWidget}
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
        members={members}
        onApplyFilters={handleApplyFilters}
      />

   
      <BoardFilters 
        board={board}
        onFiltersChange={handleFiltersChange}
        onFilteredBoardChange={handleFilteredBoardChange}
        searchText={searchText}
        selectedPersonId={selectedPersonId}
        selectedSortField={selectedSortField}
        sortDirection={sortDirection}
        advancedFilters={advancedFilters}
      />

      <div className="board-content-container">
        {activeView.type === "table" ? (
          <div className="board-table-container">
            <BoardTable
              ref={boardTableRef}
              board={filteredBoard || board}
              onUpdateTask={handleUpdateBoard}
              onAddNewTask={(task, groupId) => {}}
              onOpenUpdates={handleOpenUpdates}
            />
          </div>
        ) : activeView.type === "kanban" ? (
          <div className="kanban-container">
            <KanbanBoard
              board={filteredBoard || board}
              onUpdateTask={handleUpdateBoard}
              onOpenTaskDetails={handleOpenUpdates}
            />
          </div>
        ) : (
          <div className="board-dashboard-container">
            <Dashboard
              board={board}
              selectedWidget={selectedWidget}
              onAddWidget={handleSelectWidget}
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



    </section>
  )
}
