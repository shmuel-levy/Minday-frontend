import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import {HomeIcon} from "./svg/HomeIcon";
import {CalendarIcon} from "./svg/CalendarIcon";
import {ArrowIcon} from "./svg/ArrowIcon";

import {SidebarBoardsList} from "./SidebarBoardsList";
import {SidebarFavoriteBoards} from "./SidebarFavoriteBoards";
import {loadBoards} from "../store/board.actions";

export function Sidebar({onOpenBoardModal}) {
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    _loadDataBoards();
  }, []);

  useEffect(() => {
    console.log("boards", boards);
  }, [boards]);

  async function _loadDataBoards() {
    try {
      const boards = await loadBoards();
    } catch (err) {
      console.error("Error loading Boards:", err);
      showErrorMsg("Cannot load Boards");
    }
  }

  const navigate = useNavigate();
  const location = useLocation();

  const isHomeActive = location.pathname === "/";

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isCollapsed ? "30px" : "280px"
    );

    document.documentElement.style.setProperty(
      "--main-content-margin",
      isCollapsed ? "42px" : "292px"
    );
  }, [isCollapsed]);

  useEffect(() => {
    function handleCloseFavorites() {
      setIsFavoritesOpen(false);
    }

    window.addEventListener("close-favorites", handleCloseFavorites);
    return () =>
      window.removeEventListener("close-favorites", handleCloseFavorites);
  }, []);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span className={isCollapsed ? "rotated" : ""}>
          <ArrowIcon />
        </span>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-header">
          <div
            className={`sidebar-item ${isHomeActive ? "active" : ""}`}
            onClick={() => navigate("/board")}
          >
            <HomeIcon />
            {!isCollapsed && <span>Home</span>}
          </div>

          <div className="sidebar-item" onClick={() => navigate("/my-work")}>
            <CalendarIcon />
            {!isCollapsed && <span>My work</span>}
          </div>
        </div>

        {!isCollapsed && (
          <>
            <hr className="divider" />

            <SidebarFavoriteBoards
              isOpen={isFavoritesOpen}
              onToggle={() => setIsFavoritesOpen((prev) => !prev)}
            />

            <hr className="divider" />

            <SidebarBoardsList
              boards={boards}
              favoritesOpen={isFavoritesOpen}
              onOpenBoardModal={onOpenBoardModal}
            />
          </>
        )}
      </div>
    </aside>
  );
}
