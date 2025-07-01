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
import { Modal } from "./Modal";
import "../assets/styles/cmps/DeleteConfirmationModal.scss";
import { userService } from '../services/user';
import { canDeleteDemoData } from '../services/permission.service';

export function SidebarBoardsList({boards, favoritesOpen, onOpenBoardModal}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // const [localBoards, setLocalBoards] = useState(boards || []);
  const addBoardBtnRef = useRef(null);
  const { handleRemoveBoard } = useBoardState();
  const [pendingDeleteBoard, setPendingDeleteBoard] = useState(null);
  const user = userService.getLoggedinUser();

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
        {boards.map((board) => {
          const isDemoDeleteNotAllowed = board.isDemo && !user?.isAdmin;
          return (
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
              <span
                className="trash-icon-wrapper"
                onClick={e => {
                  e.stopPropagation();
                  if (!isDemoDeleteNotAllowed) setPendingDeleteBoard(board);
                }}
                title={isDemoDeleteNotAllowed ? 'Only admins can delete demo boards.' : ''}
                style={isDemoDeleteNotAllowed ? { pointerEvents: 'none', opacity: 0.5 } : {}}
              >
                <TrashIcon />
              </span>
            </div>
          );
        })}
      </div>

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateBoard={handleCreateBoard}
      />

      <Modal
        isOpen={!!pendingDeleteBoard}
        onClose={() => setPendingDeleteBoard(null)}
        className="delete-confirmation-modal"
        hideDefaultHeader={true}
      >
        <div className="modal-component default-overlay-style system-modal delete-object-wrapper" style={{position: 'relative'}}>
          <button
            className="delete-modal-close"
            onClick={() => setPendingDeleteBoard(null)}
            aria-label="Close"
            style={{position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 24, color: '#676879', cursor: 'pointer'}}
          >
            &times;
          </button>
          <div className="modal-component-content">
            <div className="delete-object-warning-dialog">
              <div className="delete-object-warning-title-wrapper">
                <h2 className="want-to-delete-title">Delete this board?</h2>
              </div>
              <p className="want-to-delete-bottom-note">We'll keep it in your trash for 30 days, and then permanently delete it.</p>
              <span className="delete-object-warning-dialog-button-section">
                <button
                  type="button"
                  className="want-to-delete-secondary-button button_179ab51c11 sizeMedium_58824a014d kindTertiary_08f8117bdb colorPrimary_1e1fb85d38 marginRight_a08cb551e8"
                  onClick={() => setPendingDeleteBoard(null)}
                  data-testid="button"
                  data-vibe="Button"
                  aria-disabled="false"
                  aria-busy="false"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="button_179ab51c11 sizeMedium_58824a014d kindPrimary_6478670b5e colorPrimary_1e1fb85d38"
                  onClick={async () => {
                    await handleRemoveBoard(pendingDeleteBoard._id);
                    setPendingDeleteBoard(null);
                  }}
                  data-testid="button"
                  data-vibe="Button"
                  aria-disabled="false"
                  aria-busy="false"
                >
                  Delete board
                </button>
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
