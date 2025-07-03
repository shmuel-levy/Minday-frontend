import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {userService} from "../services/user";
import {showSuccessMsg, showErrorMsg} from "../services/event-bus.service";
import {Modal} from "./Modal";

export function CreateBoardModal({isOpen, onClose, onCreateBoard}) {
  const [boardName, setBoardName] = useState("New Board");
  const [selectedType, setSelectedType] = useState("Items");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const boardTypes = [
    {id: "Items", label: "Items"},
    {id: "Employees", label: "Employees"},
    {id: "Leads", label: "Leads"},
    {id: "Creatives", label: "Creatives"},
    {id: "Tasks", label: "Tasks"},
    {id: "Budgets", label: "Budgets"},
    {id: "Campaigns", label: "Campaigns"},
    {id: "Projects", label: "Projects"},
    {id: "Clients", label: "Clients"},
    {id: "Custom", label: "Custom"},
  ];

  async function handleCreateBoard() {
    if (!boardName.trim()) {
      showErrorMsg("Board name is required");
      return;
    }

    setIsLoading(true);
    try {
      const boardData = {
        title: boardName.trim(),
        description: `Managing ${selectedType.toLowerCase()}`,
        isStarred: false,
        createdBy: userService.getLoggedinUser(),
        members: [userService.getLoggedinUser()],
        type: selectedType,
        dashboardWidgets: [],
        // groups: selectedType === 'Tasks' ? [
        //     {
        //         id: makeId(),
        //         title: 'To Do',
        //         color: '#579BFC',
        //         tasks: []
        //     },
        //     {
        //         id: makeId(),
        //         title: 'In Progress',
        //         color: '#FDAB3D',
        //         tasks: []
        //     },
        //     {
        //         id: makeId(),
        //         title: 'Done',
        //         color: '#00C875',
        //         tasks: []
        //     }
        // ] : []
      };

      await onCreateBoard(boardData);
      showSuccessMsg(`Board "${boardName}" created successfully`);
    } catch (err) {
      showErrorMsg("Failed to create board");
      console.error("Error creating board:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    setBoardName("New Board");
    setSelectedType("Items");
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Create board"
      className="create-board-modal"
    >
      <div className="board-form">
        <div className="form-group">
          <label htmlFor="boardName">Board name</label>
          <input
            id="boardName"
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Enter board name"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Select what you're managing in this board:</label>
          <div className="board-types-grid">
            {boardTypes.map((type) => (
              <label key={type.id} className="board-type-option">
                <input
                  type="radio"
                  name="boardType"
                  value={type.id}
                  checked={selectedType === type.id}
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                <span className="radio-label">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCreateBoard}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Board"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
