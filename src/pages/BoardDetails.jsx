import {useState, useEffect, useRef, useCallback} from "react";
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
import {BoardFilters} from "../cmps/BoardFilters";
import { recordRecentBoard } from '../services/board/board.service.local'

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
  const [filteredBoard, setFilteredBoard] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState([]);

  useEffect(() => {
  if (board) recordRecentBoard(board)
}, [board?._id]) 

  useEffect(() => {
    if (boardId) {
      _loadBoard(boardId)
    }
  }, [])

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
            });
          }
        });
      });
    }
    
    return Array.from(allMembers.values());
  };

  const members = extractMembers();

  const activeView = views.find((v) => v.id === activeViewId) || views[0];

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
  )
}
