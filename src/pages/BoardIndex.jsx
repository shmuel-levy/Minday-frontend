import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loadBoards, toggleBoardStar } from "../store/board.actions.js";
import { userService } from "../services/user/index.js";
import { StarIcon } from "../cmps/svg/StarIcon.jsx";
import { BoardIcon } from "../cmps/svg/BoardIcon.jsx";

import { WorkspaceIcon } from "../cmps/svg/WorkspaceIcon.jsx";
import { CollapsibleDescriptionIcon } from "../cmps/svg/CollapsibleDescriptionIcon.jsx";
import { DropdownHome } from "../cmps/svg/DropdownButtonHome.jsx";
import { DropdownButtonRight } from "../cmps/svg/DropdownButtonRight.jsx";
import { HomeWorkspaceIcon } from "../cmps/svg/HomeIconWorkspace.jsx";

export function BoardIndex() {
  const boards =
    useSelector((storeState) => storeState.boardModule.boards) || [];
  const navigate = useNavigate();
  const [isRecentlyVisitedCollapsed, setIsRecentlyVisitedCollapsed] =
    useState(false);
  const [isMyWorkspacesCollapsed, setIsMyWorkspacesCollapsed] = useState(false);
  const [isUpdateFeedCollapsed, setIsUpdateFeedCollapsed] = useState(false);

  const [recentBoards, setRecentBoards] = useState([]);

  // useEffect(() => {
  //     // function syncRecent(e) {
  //     //     if (e.key === 'recentBoards') {
  //     //         try {
  //     //             setRecentBoards(JSON.parse(e.newValue) || [])
  //     //         } catch { /* ignore */ }
  //     //     }
  //     // }
  //     // window.addEventListener('storage', syncRecent)
  //     // return () => window.removeEventListener('storage', syncRecent)
  // }, [])

  useEffect(() => {
    console.log("use effect recent boards");

    setRecentBoardsFromBackend();
  }, []);

  async function setRecentBoardsFromBackend() {
    const boards = await loadBoards();
    // const storedRecent = JSON.parse(localStorage.getItem('recentBoards')) || []
    setRecentBoards(boards);
  }

  function onBoardClick(boardId) {
    const board = boards.find((b) => b._id === boardId);
    if (board) {
      const cleanBoards = recentBoards.filter((b) => b && b._id && b.title);
      const updated = [
        board,
        ...cleanBoards.filter((b) => b._id !== board._id),
      ].slice(0, 4);
      setRecentBoards(updated);
      localStorage.setItem("recentBoards", JSON.stringify(updated));
    }

    navigate(`/board/${boardId}`);
  }

  function onStarClick(e, boardId) {
    e.stopPropagation();
    toggleBoardStar(boardId)
      .then((updatedBoard) => {
        setRecentBoards((prev) =>
          prev.map((b) => (b._id === updatedBoard._id ? updatedBoard : b))
        );
      })
      .catch((err) => {
        console.error("🔴 Failed to toggle star:", err);
      });
  }

  function getBoardPreview(board) {
    if (!board || !board._id) return "./img/quick-search.svg"; // fallback preview
    const templates = ["./img/quick-search.svg"];
    const templateIndex = board._id.length % templates.length;
    return templates[templateIndex];
  }

  function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  }

  return (
    <div className="board-index">
      <div className="board-index-header">
        <div className="welcome-section">
          <h1>
            {getTimeBasedGreeting()},{" "}
            {userService.getLoggedinUser()?.fullname || "Guest"}!
          </h1>
          <p>Quickly access your recent boards, Inbox and workspaces</p>
        </div>
      </div>

      <div className="board-container">
        <div className="recently-visited-section">
          <div
            className="section-header"
            onClick={() =>
              setIsRecentlyVisitedCollapsed(!isRecentlyVisitedCollapsed)
            }
          >
            {isRecentlyVisitedCollapsed ? (
              <DropdownButtonRight />
            ) : (
              <DropdownHome />
            )}
            <p>Recently visited</p>
          </div>

          {!isRecentlyVisitedCollapsed && (
            <div className="boards-grid">
              {recentBoards.length > 0 ? (
                recentBoards
                  .filter((board) => board && board._id && board.title)
                  .map((board) => (
                    <div
                      key={board._id}
                      className="board-card"
                      onClick={() => onBoardClick(board._id)}
                    >
                      <div className="board-preview">
                        <img
                          src={getBoardPreview(board)}
                          alt="Board preview"
                          className="board-preview-img"
                        />
                      </div>

                      <div className="board-info">
                        <div className="board-title-row">
                          <BoardIcon />
                          <div className="board-title">{board.title}</div>
                          <StarIcon
                            isStarred={board.isStarred}
                            onClick={(e) => onStarClick(e, board._id)}
                          />
                        </div>
                        <div className="board-workspace">
                          <div className="workspace-icon">
                            <WorkspaceIcon />
                          </div>
                          <div className="workspace-text">
                            work management &gt; Main workspace{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <h3>No boards yet</h3>
                  <p>Create your first board to get started</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="update-feed-section">
          <div
            className="section-header"
            onClick={() => setIsUpdateFeedCollapsed(!isUpdateFeedCollapsed)}
          >
            {isUpdateFeedCollapsed ? <DropdownButtonRight /> : <DropdownHome />}
            <h2>Update feed (Inbox)</h2>
            <div className="inbox-count">0</div>
          </div>
        </div>

        <div className="my-workspaces-section">
          <div
            className="section-header"
            onClick={() => setIsMyWorkspacesCollapsed(!isMyWorkspacesCollapsed)}
          >
            {isMyWorkspacesCollapsed ? (
              <DropdownButtonRight />
            ) : (
              <DropdownHome />
            )}
            <h2>My workspaces</h2>
            <div className="info-icon">
              <CollapsibleDescriptionIcon />
            </div>
          </div>

          <div className="my-workspaces-component">
            <div className="workspaces-list">
              {!isMyWorkspacesCollapsed && (
                <div className="workspace-card">
                  <div className="home-icon-wrap">
                    <div
                      className="workspace-icon-container"
                      style={{ backgroundColor: "#FF642E" }}
                    >
                      <div className="workspace-icon" aria-label="Workspace">
                        <span className="letter">M</span>
                      </div>
                      <div className="home-icon">
                        <HomeWorkspaceIcon />
                      </div>
                    </div>
                  </div>

                  <div className="workspace-card-titles">
                    <div className="workspace-name">Main workspace</div>
                    <div className="workspace-type">
                      <div>
                        <WorkspaceIcon />
                      </div>
                      <div className="text">work management</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
