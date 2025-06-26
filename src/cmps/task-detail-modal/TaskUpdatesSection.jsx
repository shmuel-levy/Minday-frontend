import { useState, useEffect, useRef } from "react";
import { Bold, Italic, Underline, Link, List, AlignLeft, User } from "lucide-react";
// import { userService } from "../../services/user";
import { UserAvatar } from "../UserAvatar";
import { useSelector } from 'react-redux'
import { Trash } from "lucide-react";
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service'

import { useDispatch } from 'react-redux'
import { removeTaskUpdate } from '../../store/board.actions'



export function TaskUpdatesSection({ task, groupId, onUpdateAdded }) {

  
  const [text, setText] = useState("");
  const [updates, setUpdates] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const editableRef = useRef(null);

  const user = useSelector(state => state.userModule.user)
  const dispatch = useDispatch()
  const boardId  = useSelector(state => state.boardModule.board?._id)



  useEffect(() => {
    if (task) {
      setUpdates(task.updates || []);
    }
  }, [task]);

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!text.trim()) return;

    const newUpdate = {
      id: `update_${Date.now()}`,
      text: text.trim(),
      type: "text",
      createdAt: Date.now(),
      byMember: {
        _id: user?._id || "guest",
        fullname: user?.fullname || "Guest User",
        imgUrl: user?.imgUrl || ""
      }
    }

    setUpdates((prev) => [...prev, newUpdate]);
    setText("");
    setIsEditorOpen(false);

    if (onUpdateAdded && task && groupId) {
      onUpdateAdded(task.id, groupId, newUpdate);
    }
  }

  function formatDate(ts) {
    const now = Date.now()
    const diff = now - ts
    const sec = diff / 1000
    const min = sec / 60
    const hour = min / 60
    const day = hour / 24

    if (sec < 60) return 'Just now'
    if (min < 60) return `${Math.floor(min)}m ago`
    if (hour < 24) return `${Math.floor(hour)}h ago`
    if (day < 30) return `${Math.floor(day)} days ago`

    // 30+ days → always full format (with year)
    const dateObj = new Date(ts)
    return dateObj.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) // e.g. "May 21, 2025"
  }

  function handleFormat(command) {
    if (editableRef.current) {
      editableRef.current.focus();
      document.execCommand(command, false, null);
    }
  }

    async function handleDelete(updateId) {
  setUpdates(prev => prev.filter(u => u.id !== updateId))

  try {
    await removeTaskUpdate(boardId, groupId, task.id, updateId)
    showSuccessMsg('Update deleted successfully')
  } catch (err) {
    console.error('Failed to remove update', err)
    showErrorMsg('Could not delete update – please try again')
  }
}

  return (
    <>
      <div className="editor-container">
        {!isEditorOpen ? (
          <div className="fake-textarea" onClick={() => setIsEditorOpen(true)}>
            Write an update and mention others with @...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rich-editor">
            <div className="toolbar">
              <button type="button" onClick={() => handleFormat("bold")}>
                <Bold size={16} />
              </button>
              <button type="button" onClick={() => handleFormat("italic")}>
                <Italic size={16} />
              </button>
              <button type="button" onClick={() => handleFormat("underline")}>
                <Underline size={16} />
              </button>
              <button type="button">
                <Link size={16} />
              </button>
              <button type="button">
                <List size={16} />
              </button>
              <button type="button">
                <AlignLeft size={16} />
              </button>
            </div>

            <div
              className="editable"
              contentEditable
              suppressContentEditableWarning
              ref={editableRef}
              onInput={(e) => setText(e.currentTarget.innerHTML)}
              placeholder="Write your update here..."
            ></div>

            <div className="bottom-actions">
              <span className="mention">@ Mention</span>
              <button type="submit" className="submit-btn">
                Update
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="updates-list">
        {updates.length === 0 ? (
          <div className="no-updates">
            <img
              src="https://microfrontends.monday.com/mf-feed/latest/static/media/empty-state.8bf98d52.svg"
              alt="No updates yet"
            />
            <h3>
              <strong>No updates yet</strong>
            </h3>
            <div>
              Share progress, mention a teammate,<br /> or upload a file to
              get things moving
            </div>
          </div>
        ) : (
          <ul>
            {updates.map((update) => (
              <li key={update.id} className="update-item">
                <div className="update-header">
                  {/* Left: Avatar, name, date */}
                  <div className="update-author-container">
                    {update.byMember?.imgUrl ? (
                      <img
                        className="update-avatar"
                        src={update.byMember.imgUrl}
                        alt={update.byMember.fullname || "User avatar"}
                      />
                    ) : (
                      <UserAvatar user={update.byMember} size={40} />
                    )}

                    <span className="update-author">
                      {update.byMember?.fullname || "Unknown User"}
                    </span>

                    <span className="update-date">
                      {formatDate(update.createdAt)}
                    </span>
                  </div>

                  {/* Right: Delete button */}
                  {user?._id === update.byMember?._id && (
                    <button
                      type="button"
                      className="update-delete-btn"
                      onClick={() => handleDelete(update.id)}
                    >
                      Delete&nbsp;
                      <Trash size={16} strokeWidth={1.5} />
                    </button>
                  )}
                </div>

                <div
                  className="update-content"
                  dangerouslySetInnerHTML={{ __html: update.text }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
