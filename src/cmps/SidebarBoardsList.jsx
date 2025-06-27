import {useState, useRef, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {WorkspaceSidebar} from "./svg/WorkspaceSidebar";
import {AddBoard} from "./svg/AddBoard";
import {CreateBoardModal} from "./CreateBoardModal";
import {BoardIconSidebar} from "./svg/BoardIconSidebar";
import {ArrowDownUpIcon} from "./svg/ArrowDownUpIcon";
import {HomeWorkspaceIcon} from "./svg/HomeIconWorkspace";
import {AddBoardDropdown} from "./AddBoardDropdown";
import {boardService} from "./../services/board";
import {showSuccessMsg, showErrorMsg} from "../services/event-bus.service";
import {addBoard, updateBoard} from "../store/board.actions";
import {TrashIcon} from "./svg/TrashIcon";
import { useBoardState } from "../customHooks/useBoardState";

export function SidebarBoardsList({boards, favoritesOpen, onOpenBoardModal}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // const [localBoards, setLocalBoards] = useState(boards || []);
  const addBoardBtnRef = useRef(null);
  const { handleRemoveBoard } = useBoardState();

  if (favoritesOpen) {
    return (
      <section className="sidebar-workspaces">
        <div
          className="sidebar-item"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("close-favorites"))
          }
        >
          <WorkspaceSidebar />
          <span className="title">Workspaces</span>
          <span className="chevron">
            <ArrowDownUpIcon direction={favoritesOpen ? "up" : ""} />
          </span>
        </div>
      </section>
    );
  }

  const handleAddBoardClick = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownSelect = (type) => {
    setIsDropdownOpen(false);
    if (type === "board") {
      setIsCreateModalOpen(true);
    }
    // Handle other types (dashboard, kanban) here when implemented
  };

  //change to work with service
  const handleCreateBoard = async ({title, description}) => {
    try {
      // const newBoard = {
      //   ...boardService.getEmptyBoard(),
      //   ...boardData,
      //   createdAt: Date.now(),
      // };
      const newBoard = await boardService.getDemoDataBoard();
      const savedBoard = await addBoard({...newBoard, title, description});
      // setLocalBoards((prevBoards) => [...prevBoards, savedBoard]);
      setIsCreateModalOpen(false);
      showSuccessMsg(`Board "${savedBoard.title}" created successfully`);
      navigate(`/board/${savedBoard._id}`);
    } catch (error) {
      console.error("Failed to create board:", error);
      showErrorMsg("Failed to create board");
    }
  };

  return (
    <section className="sidebar-workspaces">
      <div className="section-title workspace-title">
        <WorkspaceSidebar />
        <span>Workspaces</span>
      </div>

      <div className="workspace-container">
        <div className="workspace-header">
          <span className="workspace-icon">
            <div className="main-home-icon">
              <HomeWorkspaceIcon />
            </div>
            M
          </span>
          <div>
            <div className="workspace-name">Main workspace</div>
          </div>
        </div>

        <div className="add-board-container">
          <button
            ref={addBoardBtnRef}
            className="add-board-btn"
            onClick={handleAddBoardClick}
            title="Create board"
          >
            <AddBoard />
          </button>

          {isDropdownOpen && (
            <AddBoardDropdown
              onClose={() => setIsDropdownOpen(false)}
              onSelect={handleDropdownSelect}
              triggerRef={addBoardBtnRef}
            />
          )}
        </div>
      </div>

      <div className="workspace-boards">
        {boards.map((board) => (
          <div
            key={board?._id}
            className={`board-item ${
              location.pathname === `/board/${board?._id}` ? "active" : ""
            }`}
            onClick={() => navigate(`/board/${board?._id}`)}
            style={{ position: 'relative' }}
          >
            <BoardIconSidebar />
            <span className="board-title">{board?.title}</span>
            <span className="trash-icon-wrapper" onClick={e => {
              e.stopPropagation();
              handleRemoveBoard(board._id);
            }}>
              <TrashIcon />
            </span>
          </div>
        ))}
      </div>

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateBoard={handleCreateBoard}
      />
    </section>
  );
}
